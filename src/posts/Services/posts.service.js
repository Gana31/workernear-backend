import { deleteFromCloudinary, uploadToCloudinary } from "../../../config/multer.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { sendMail } from "../../../utils/sendEmail.js";
import { UserWorkerModel } from "../../databaseRelations.js";
import UserRepository from "../../User/Repository/user.respository.js";
import PostModel from "../Models/posts.models.js";
import JobRespository from "../Repository/job.respository.js";
import PostsRespository from "../Repository/posts.respository.js";
import { Op } from 'sequelize';  // Assuming you're using Sequelize
const postsRepository = new PostsRespository();
const jobRespository = new JobRespository()
const Userrepository = new UserRepository();
class PostsService {
  createPostService = async (data, files) => {
    try {
      if (!data) throw new ApiError(400, "Data is not present in the service layer of create post");

      // Handle visual mode image upload
      if (data.mode === 'visual') {
        if (!files || !files.images || files.images.length === 0) {
          throw new ApiError(400, "An image is required for visual mode");
        }

        // Upload the image to Cloudinary
        const image = files.images[0];
        const cloudinaryResponse = await uploadToCloudinary(image, 'jobpostimages');

        // Append Cloudinary response details to the post data
        data.imagepublicid = cloudinaryResponse.public_id;
        data.image = cloudinaryResponse.secure_url;
      }

      // Save the post to the database via the repository
      const savedPost = await postsRepository.create(data);
      return savedPost;
    } catch (error) {
      throw new ApiError(500, error.message || "Error creating post");
    }
  };

  updatePostService = async (data, files) => {
    try {
        // Retrieve the existing post from the database
        const existingPost = await postsRepository.findById(data.id);
        if (!existingPost) throw new ApiError(404, "Post not found");

        // Handle visual mode updates
        if (data.mode === 'visual') {
            // Check if new files are provided
            if (files && files.images && files.images.length > 0) {
                const newImage = files.images[0];

                // Upload the new image to Cloudinary
                const cloudinaryResponse = await uploadToCloudinary(newImage, 'jobpostimages');

                // Delete the old image from Cloudinary if it exists
                if (existingPost.imagepublicid) {
                    await deleteFromCloudinary(existingPost.imagepublicid);
                }

                // Update the data with new image details
                data.imagepublicid = cloudinaryResponse.public_id;
                data.image = cloudinaryResponse.secure_url;
            } else {
                // Ensure existing image is retained if no new image is uploaded
                data.imagepublicid = existingPost.imagepublicid;
                data.image = existingPost.image;
            }
        }

        // Update the post in the database
        const updatedPost = await postsRepository.update(data.id, data);

        return updatedPost;
    } catch (error) {
        throw new ApiError(500, error.message || "Error updating post");
    }
};



// Get All Posts with Filters and Applied Status
getAllPostsService = async ({ keywords, location, id }) => {
  try {
    // Build a filter object for fetching posts
    const filter = {
      postMode: 'Public', // Only fetch public posts
      createdby: { [Op.ne]: id } // Exclude posts created by the user
    };

    // If `keywords` is provided, filter by title, skills, or category
    if (keywords) {
      filter[Op.or] = [
        { title: { [Op.iLike]: `%${keywords}%` } },  // Case-insensitive search for title
        { skills: { [Op.iLike]: `%${keywords}%` } }, // Case-insensitive search for skills
        { category: { [Op.iLike]: `%${keywords}%` } } // Case-insensitive search for category
      ];
    }

    // If `location` is provided, filter by location or city
    if (location) {
      filter[Op.or] = filter[Op.or] || [];  // Ensure we don't override the existing `Op.or`
      filter[Op.or].push(
        { location: { [Op.iLike]: `%${location}%` } }, // Case-insensitive search for location
        { city: { [Op.iLike]: `%${location}%` } }     // Case-insensitive search for city
      );
    }

    // Query all posts based on the filters
    const posts = await postsRepository.findAll({
      where: filter
    });

    // Check if the user has applied for any of the fetched posts
    const jobApplications = await jobRespository.findAll({
      where: {
        userId: id,
        jobId: posts.map(post => post.id)  // Get applications for the posts the user is interested in
      }
    });

    // Create a set of applied job IDs for easier lookup
    const appliedJobIds = new Set(jobApplications.map(app => app.jobId));

    // Add `applied` field to each post
    const postsWithAppliedStatus = posts.map(post => {
      const isApplied = appliedJobIds.has(post.id); // Check if the user has applied for this post
      return {
        ...post.toJSON(),
        applied: isApplied // Add the `applied` field
      };
    });

    return postsWithAppliedStatus;
  } catch (error) {
    throw new Error(error.message || "Error fetching posts with filters and application status");
  }
};


  // Get Post by ID
  getPostByIdService = async (id) => {
    try {
      return await postsRepository.findById(id);
    } catch (error) {
      throw new Error(error.message || "Error fetching post by ID");
    }
  };

  // Delete Post
  deletePostService = async (id) => {
    try {
      return await postsRepository.delete(id);
    } catch (error) {
      throw new Error(error.message || "Error deleting post");
    }
  };

  getPostsByUserIdService = async (id) => {
    try {
        // Pass the userId in the options to filter posts by userId
        let posts = await postsRepository.findAll({
            where: { createdby :id } // Filter posts by userId
        });
        if (!posts || posts.length === 0) {
         return posts = []
        }
        return posts;
    } catch (error) {
        throw new ApiError(500, error.message || "Error fetching posts for the user");
    }
};

async applyForJob(userId, jobId) {
  try {
      // Check if the user has already applied for this job
      const existingApplication = await jobRespository.checkIfAlreadyApplied(userId, jobId);

      if (existingApplication) {
          throw new ApiError(400, 'You have already applied for this job');
      }

      // If not already applied, create a new application
      const applicationData = {
          userId,
          jobId,
          status: 'pending',  // Default status when the user applies
      };
      const newApplication = await jobRespository.create(applicationData);

      return newApplication;
  } catch (error) {
      throw new ApiError(500, error.message || 'Error applying for job', error);
  }
}

getJobApplicationsForJob = async (jobId) => {
  try {
    // Step 1: Get all applications for the given jobId
    const applications = await jobRespository.findAll({
      where: { jobId },
      include: [
        {
          model: UserWorkerModel,  // Assuming UserRepository.model is the User model
          as:"user",
          attributes: ['id', 'name', 'email', 'avatar','experience']  // Select required fields for user
        },
        {
          model: PostModel,  // Assuming jobRepository.model is the Job model
          as: 'job',
          attributes: ['id', 'title', 'companyimgae']  // Select required fields for job
        }
      ]
    });
    // console.log(applications)

    if (!applications || applications.length === 0) {
      throw new ApiError(404, 'No applications found for this job');
    }
    return applications.map(application => {
      // Returning a custom response that includes job, user, and application details
      return {
        userId: application.userId,
        name: application.user.name,
        email: application.user.email,
        experience : application.user.experience,
        profileImage: application.user.avatar,
        jobId: application.jobId,
        jobTitle: application.job.title,
        jobCompanyName: application.job.companyimgae,
        id: application.id,
        status: application.status
      };
    });
  } catch (error) {
    console.log(error)
    throw new ApiError(500, error.message || 'Error fetching job applications');
  }
};

async changeStatus(jobId, status,jobTitle,companyName,userEmail) {
  try {
    // Step 1: Find the application by jobId
    const application = await jobRespository.findOne({ where: { id: jobId } });

    if (!application) {
      throw new ApiError(404, 'Job application not found');
    }
    

    // Step 2: Update the status of the job application
    application.status = status;
    await application.save();

    // Step 3: Fetch the updated application with associated user and job details
    const updatedApplication = await jobRespository.findOne({
      where: { id: jobId },
      include: [
        {
          model: UserWorkerModel,  // Assuming UserWorkerModel is the User model
          as: "user",
          attributes: ['id', 'name', 'email', 'avatar', 'experience'] // Select required fields for user
        },
        {
          model: PostModel,  // Assuming PostModel is the Job model
          as: 'job',
          attributes: ['id', 'title', 'companyimgae'] // Select required fields for job
        }
      ]
    });

    if(status == "reject"){
      sendMail({
          email: userEmail,
          subject: "Job Application Result",
          isSelected: false, // true for selection, false for rejection
          jobTitle: jobTitle,
          companyName:companyName
        });
    }
    else{
      sendMail({
        email: userEmail,
        subject: "Job Application Result",
        isSelected: true, // true for selection, false for rejection
        jobTitle: jobTitle,
        companyName:companyName
      });
    }
    // 
    // Step 4: Return the updated application details in a structured format
    return {
      userId: updatedApplication.userId,
      name: updatedApplication.user.name,
      email: updatedApplication.user.email,
      experience: updatedApplication.user.experience,
      profileImage: updatedApplication.user.avatar,
      jobId: updatedApplication.jobId,
      jobTitle: updatedApplication.job.title,
      jobCompanyName: updatedApplication.job.companyimgae,
      id: updatedApplication.id,
      status: updatedApplication.status
    };
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message || 'Error updating job application status');
  }
}



}

export default new PostsService();
