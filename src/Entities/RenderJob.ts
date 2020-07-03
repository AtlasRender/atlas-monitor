export default class RenderJob {
    public static QUEUED: number = 100;
    public static PROCESSING: number = 200;
    public static SUSPENDED: number = 201;
    public static FAILED: number = 300;
    public static COMPLETED: number = 400;


    public id: number;
    public department: string;
    public submitter: string;
    public submitDate: Date;
    public status: number;

    public files: string[];
    public projectRoot: string;


    public constructor(data: any) {
        this.id = +data?.id;
        this.department = data?.department;
        this.submitter = data?.submitter;
        this.submitDate = data?.submitDate;
        this.status = data?.status || RenderJob.QUEUED;
        this.files = data?.files;
        this.projectRoot = data?.projectRoot;
    }
}