import CrudRepository from "../../../utils/crudClass.js";
import { CategoryModel } from "../../databaseRelations.js";


class CategoriesRespository extends CrudRepository {
    constructor(){
        super(CategoryModel)
    }
}

export default CategoriesRespository;