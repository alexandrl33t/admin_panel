import {makeAutoObservable, runInAction} from "mobx";
import objectService from "../services/ObjectService";

/**
 * Хранилище и стейт для объекта
 */


class ObjectStore {

    constructor(){
        makeAutoObservable(this)
        this.objectService = objectService;
    }
    objectData = {

    };
    objects = {

    }
    status = "initial";
    searchQuery = "";

    getObjectsAsync = async () => {
        try {
            let params = {
                pageNumber: this.objectData.pageNumber,
                searchQuery: this.searchQuery,
                isAscending: this.objectData.isAscending
            };
            const urlParams = new URLSearchParams(Object.entries(params));
            const data = await this.objectService.get(urlParams)

            runInAction(() => {
                this.objects = data;
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };
    createObjectAsync = async (model) => {
        try {
            const response = await this.objectService.post(model);
            if (response.status === 201) {
                runInAction(() => {
                    this.status = "success";
                })
            }
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }

    };
    updateObjectAsync = async (id, model) => {
        try {
            const response = await this.objectService.put(id, model)
            if (response.status === 200) {
                runInAction(() => {
                    this.status = "success";
                })
            }
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };
    deleteObjectAsync = async (id) => {
        try {
            const response = await this.objectService.delete(id);
            if (response.status === 204) {
                runInAction(() => {
                    this.status = "success";
                })
            }
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    setAddress(address) {
        this.objectData.address = address
    }

    setPosition(x, y){
        this.objectData.position_x = x
        this.objectData.position_y = y
    }
}

export default new ObjectStore()