export class Photo implements iPhoto {
    id: string;
    photoName: string;
    photoFile: string; 
    photo: any;
    downloadedPhoto: string;
}

export interface iPhoto {
    id: string;
}