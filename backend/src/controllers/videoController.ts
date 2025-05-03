import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../global";
import fs from "fs"

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAllVideo = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { search } = request.query

        /** process to get menu, contains means search name of menu based on sent keyword */
        const allVideo = await prisma.video.findMany({
            where: { name: { contains: search?.toString() || "" } }
        })

        return response.json({
            status: true,
            data: allVideo,
            message: `Menus has retrieved`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const createVideo = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { name, description } = request.body
        const uuid = uuidv4()

        /** variable filename use to define of uploaded file name */
        let filename = ""
        if (request.file) filename = request.file.filename /** get file name of uploaded file */

        /** process to save new menu, price and stock have to convert in number type */
        const newVideo = await prisma.video.create({
            data: { uuid, name, description, video: filename }
        })

        return response.json({
            status: true,
            data: newVideo,
            message: `New Video has created`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const updateVideo = async (request: Request, response: Response) => {
    try {
        /** get id of menu's id that sent in parameter of URL */
        const { id } = request.params
        /** get requested data (data has been sent from request) */
        const { name, description } = request.body

        /** make sure that data is exists in database */
        const findVideo = await prisma.video.findFirst({ where: { id: Number(id) } })
        if (!findVideo) return response
            .status(200)
            .json({ status: false, message: `Video is not found` })

        /** default value filename of saved data */
        let filename = findVideo.video
        if (request.file) {
            /** update filename by new uploaded video */
            filename = request.file.filename
            /** check the old video in the folder */
            let path = `${BASE_URL}/../public/video/${findVideo.video}`
            let exists = fs.existsSync(path)
            /** delete the old exists video if reupload new file */
            if (exists && findVideo.video !== ``) fs.unlinkSync(path)
        }

        /** process to update menu's data */
        const updatedVideo = await prisma.video.update({
            data: {
                name: name || findVideo.name,
                description: description || findVideo.description,
                video: filename
            },
            where: { id: Number(id) }
        })

        return response.json({
            status: true,
            data: updatedVideo,
            message: `Video has updated`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const deleteVideo = async (request: Request, response: Response) => {
    try {
        /** get id of menu's id that sent in parameter of URL */
        const { id } = request.params

        /** make sure that data is exists in database */
        const findVideo = await prisma.video.findFirst({ where: { id: Number(id) } })
        if (!findVideo) return response
            .status(200)
            .json({ status: false, message: `Video is not found` })

        /** check the old video in the folder */
        let path = `${BASE_URL}/../public/video/${findVideo.video}`
        let exists = fs.existsSync(path)
        /** delete the old exists video if reupload new file */
        if (exists && findVideo.video !== ``) fs.unlinkSync(path)

        /** process to delete video's data */
        const deletedVideo = await prisma.video.delete({
            where: { id: Number(id) }
        })
        return response.json({
            status: true,
            data: deletedVideo,
            message: `Video has deleted`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}