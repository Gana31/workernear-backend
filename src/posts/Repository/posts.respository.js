import CrudRepository from "../../../utils/crudClass.js";
import PostModel from "../Models/posts.models.js";



class PostsRespository extends CrudRepository {
    constructor(){
        super(PostModel)
    }
}

export default PostsRespository;