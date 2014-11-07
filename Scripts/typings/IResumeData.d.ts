interface IProjectData {
    projectName: string;
    projectPost: string;
    projectYearStart: number;
    projectMonthStart: number;
    projectYearEnd: number;
    projectMonthEnd: number;
    projectLong: number;
    projectDescription: string
}

interface IResumeData {
    projectExperiences: IProjectData[];
}


interface IResumeDataV2 {
    project: string;
    tech: string;
    duration: number;
}