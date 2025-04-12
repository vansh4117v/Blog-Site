import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf.js";

export class Service {
	client = new Client();
	constructor() {
		this.client
			.setEndpoint(conf.appwriteURL)
			.setProject(conf.appwriteProjectId);
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.error("Error creating post: ~ Service ~ createPost ~ error:", error)
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status}) {
        try {
            console.log("🚀 ~ Service ~ updatePost ~ content:", content)
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.error("Error updating post: ~ Service ~ updatePost ~ error:", error)
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        }
        catch (error) {
            console.error("Error deleting post: ~ Service ~ deletePost ~ error:", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.error("Error getting post: ~ Service ~ getPost ~ error:", error)
            return false
        }
    }
    
    async getPosts(queries = [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.error("Error getting all posts: ~ Service ~ getPosts ~ error:", error)
            return false            
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error("Error uploading File: ~ Service ~ uploadFile ~ error:", error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.error("Error deleting File: ~ Service ~ deleteFile ~ error:", error)
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    async getFileView(fileId) {
        try {
            const response =  await this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            )
            console.log("🚀 ~ Service ~ getFileview ~ response:", response)
            return response;
        } catch (error) {
            console.error("Error getting File: ~ Service ~ getFile ~ error:", error)
            return false
        }
    }
}

const service = new Service();
export default service;
