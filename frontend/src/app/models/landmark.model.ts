export class Landmark {
    objectId: string;
    title: string;
    short_info: string;
    description: string;
    url: string;
    photo: {
        url: string
    };
    photo_thumb: {
        url: string
    };
    geo: {
        latitude: Number,
        longitude: Number,
    };
    image_file: string;
    canWrite: boolean;
}
