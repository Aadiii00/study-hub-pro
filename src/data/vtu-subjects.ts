export interface Subject {
  subjectCode: string;
  subjectName: string;
  credits: number;
  subjectType: "theory" | "lab";
}

export interface VTUSubjectDatabase {
  [scheme: string]: {
    [branch: string]: {
      [semester: string]: Subject[];
    };
  };
}

export const vtuSubjects: VTUSubjectDatabase = {
  "2022": {
    CSE: {
      "1": [
        { subjectCode: "BMATS101", subjectName: "Mathematics-I for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BPHYS102", subjectName: "Applied Physics for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BPOPS103", subjectName: "Principles of Programming Using C", credits: 3, subjectType: "theory" },
        { subjectCode: "BESCK104A", subjectName: "Introduction to Electronics Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BENGK105", subjectName: "Communicative English", credits: 1, subjectType: "theory" },
        { subjectCode: "BPHYL106", subjectName: "Applied Physics Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BPOPL107", subjectName: "C Programming Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BIDTK158", subjectName: "Innovation and Design Thinking", credits: 3, subjectType: "theory" },
      ],
      "2": [
        { subjectCode: "BMATS201", subjectName: "Mathematics-II for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BCHES202", subjectName: "Applied Chemistry for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BICS203", subjectName: "Introduction to Computer Science", credits: 3, subjectType: "theory" },
        { subjectCode: "BESCK204B", subjectName: "Introduction to Civil Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BKSKK205", subjectName: "Samskrutika Kannada / Constitution of India", credits: 1, subjectType: "theory" },
        { subjectCode: "BCHEL206", subjectName: "Applied Chemistry Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BICSL207", subjectName: "Computer Science Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BSFHK258", subjectName: "Scientific Foundation of Health", credits: 3, subjectType: "theory" },
      ],
      "3": [
        { subjectCode: "BCS301", subjectName: "Mathematics for Computer Science", credits: 3, subjectType: "theory" },
        { subjectCode: "BCS302", subjectName: "Data Structures and Applications", credits: 4, subjectType: "theory" },
        { subjectCode: "BCS303", subjectName: "Digital Design and Computer Organization", credits: 4, subjectType: "theory" },
        { subjectCode: "BCS304", subjectName: "Operating Systems", credits: 3, subjectType: "theory" },
        { subjectCode: "BCS305", subjectName: "Object Oriented Programming with C++ and Java", credits: 3, subjectType: "theory" },
        { subjectCode: "BCSL306", subjectName: "Data Structures Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BCS307", subjectName: "Universal Human Values", credits: 1, subjectType: "theory" },
      ],
      "4": [
        { subjectCode: "BCS401", subjectName: "Microcontrollers", credits: 3, subjectType: "theory" },
        { subjectCode: "BCS402", subjectName: "Analysis and Design of Algorithms", credits: 4, subjectType: "theory" },
        { subjectCode: "BCS403", subjectName: "Database Management Systems", credits: 4, subjectType: "theory" },
        { subjectCode: "BCS404", subjectName: "Biology for Computer Engineers", credits: 3, subjectType: "theory" },
        { subjectCode: "BCS405", subjectName: "ADA Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BCSL406", subjectName: "Database Management Systems Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BCS407", subjectName: "Discrete Mathematical Structures", credits: 4, subjectType: "theory" },
      ],
      "5": [
        { subjectCode: "BCS501", subjectName: "Software Engineering & Project Management", credits: 4, subjectType: "theory" },
        { subjectCode: "BCS502", subjectName: "Computer Networks", credits: 4, subjectType: "theory" },
        { subjectCode: "BCS503", subjectName: "Theory of Computation", credits: 3, subjectType: "theory" },
        { subjectCode: "BCS515B", subjectName: "Artificial Intelligence", credits: 3, subjectType: "theory" },
        { subjectCode: "BCSL504", subjectName: "Web Technology Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BAIL504", subjectName: "Data Visualization Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BRMK557", subjectName: "Research Methodology and IPR", credits: 2, subjectType: "theory" },
        { subjectCode: "BESK508", subjectName: "Environmental Studies", credits: 1, subjectType: "theory" },
      ],
      "6": [
        { subjectCode: "BCS601", subjectName: "Cloud Computing", credits: 4, subjectType: "theory" },
        { subjectCode: "BCS602", subjectName: "Machine Learning", credits: 3, subjectType: "theory" },
        { subjectCode: "BIS601", subjectName: "Full Stack Development", credits: 3, subjectType: "theory" },
        { subjectCode: "BCSL606", subjectName: "Machine Learning Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BIKS609", subjectName: "Indian Knowledge System", credits: 1, subjectType: "theory" },
        { subjectCode: "BCSL657B", subjectName: "React", credits: 1, subjectType: "lab" },
        { subjectCode: "BAIL657C", subjectName: "Generative AI", credits: 1, subjectType: "lab" },
        { subjectCode: "BCSL657D", subjectName: "DevOps", credits: 1, subjectType: "lab" },
      ],
      "7": [
        { subjectCode: "BCS701", subjectName: "Internet of Things", credits: 3, subjectType: "theory" },
        { subjectCode: "BCS714D", subjectName: "Big Data Analytics", credits: 3, subjectType: "theory" },
        { subjectCode: "BCS702", subjectName: "Cloud Computing", credits: 3, subjectType: "theory" },
        { subjectCode: "BCS704", subjectName: "Project Phase 1", credits: 2, subjectType: "lab" },
      ],
      "8": [
        { subjectCode: "BCS801", subjectName: "Project Phase 2", credits: 8, subjectType: "lab" },
        { subjectCode: "BCS802", subjectName: "Technical Seminar", credits: 1, subjectType: "theory" },
        { subjectCode: "BCS803", subjectName: "Internship / Professional Practice", credits: 3, subjectType: "lab" },
      ],
    },
    ECE: {
      "1": [
        { subjectCode: "BMATS101", subjectName: "Mathematics-I for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BPHYS102", subjectName: "Applied Physics for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BPOPS103", subjectName: "Principles of Programming Using C", credits: 3, subjectType: "theory" },
        { subjectCode: "BESCK104A", subjectName: "Introduction to Electronics Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BENGK105", subjectName: "Communicative English", credits: 1, subjectType: "theory" },
        { subjectCode: "BPHYL106", subjectName: "Applied Physics Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BPOPL107", subjectName: "C Programming Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BIDTK158", subjectName: "Innovation and Design Thinking", credits: 3, subjectType: "theory" },
      ],
      "2": [
        { subjectCode: "BMATS201", subjectName: "Mathematics-II for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BCHES202", subjectName: "Applied Chemistry for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BICS203", subjectName: "Introduction to Computer Science", credits: 3, subjectType: "theory" },
        { subjectCode: "BESCK204B", subjectName: "Introduction to Civil Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BKSKK205", subjectName: "Samskrutika Kannada / Constitution of India", credits: 1, subjectType: "theory" },
        { subjectCode: "BCHEL206", subjectName: "Applied Chemistry Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BICSL207", subjectName: "Computer Science Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BSFHK258", subjectName: "Scientific Foundation of Health", credits: 3, subjectType: "theory" },
      ],
      "3": [
        { subjectCode: "BMATEC301", subjectName: "Mathematics-III for EC Engineering", credits: 4, subjectType: "theory" },
        { subjectCode: "BEC302", subjectName: "Digital System Design using Verilog", credits: 4, subjectType: "theory" },
        { subjectCode: "BEC303", subjectName: "Electronic Principles and Circuits", credits: 4, subjectType: "theory" },
        { subjectCode: "BEC304", subjectName: "Network Analysis", credits: 3, subjectType: "theory" },
        { subjectCode: "BEC306A", subjectName: "Electronic Devices", credits: 3, subjectType: "theory" },
        { subjectCode: "BECL305", subjectName: "Analog and Digital Systems Design Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BSCK307", subjectName: "Social Connect and Responsibility", credits: 1, subjectType: "theory" },
      ],
      "4": [
        { subjectCode: "BECPCC401", subjectName: "Electromagnetics Theory", credits: 4, subjectType: "theory" },
        { subjectCode: "BECPCC402", subjectName: "Principles of Communication Systems", credits: 4, subjectType: "theory" },
        { subjectCode: "BECPCC403", subjectName: "Control Systems", credits: 4, subjectType: "theory" },
        { subjectCode: "BBTBIO405", subjectName: "Biology for Engineers", credits: 3, subjectType: "theory" },
      ],
      "5": [
        { subjectCode: "BECPCC501", subjectName: "Digital Communication", credits: 4, subjectType: "theory" },
        { subjectCode: "BECPCC502", subjectName: "Digital Signal Processing", credits: 4, subjectType: "theory" },
        { subjectCode: "BECMAE503", subjectName: "Technological Innovation and Management Entrepreneurship", credits: 3, subjectType: "theory" },
        { subjectCode: "BHSRMI505", subjectName: "Research Methodology and IPR", credits: 2, subjectType: "theory" },
        { subjectCode: "BECPCL507", subjectName: "Digital Communication Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BECPRJ506", subjectName: "Mini Project Work", credits: 2, subjectType: "lab" },
        { subjectCode: "BMNAPT509", subjectName: "General Aptitude for Competitive Examinations", credits: 1, subjectType: "theory" },
      ],
      "6": [
        { subjectCode: "BECPCC601", subjectName: "VLSI Design and Testing", credits: 4, subjectType: "theory" },
        { subjectCode: "BECPCC602", subjectName: "Embedded System Design", credits: 4, subjectType: "theory" },
        { subjectCode: "BEC613A", subjectName: "Multimedia Communication", credits: 3, subjectType: "theory" },
        { subjectCode: "BECPCL606", subjectName: "VLSI Design and Testing Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BECPRJ605", subjectName: "Capstone Project Work – Phase I", credits: 2, subjectType: "lab" },
        { subjectCode: "BHSIKS608", subjectName: "Indian Knowledge System", credits: 1, subjectType: "theory" },
      ],
      "7": [
        { subjectCode: "BECPCC701", subjectName: "Microwave Engineering and Antenna Theory", credits: 4, subjectType: "theory" },
        { subjectCode: "BECPCC702", subjectName: "Wireless Communication Systems", credits: 4, subjectType: "theory" },
        { subjectCode: "BECPCC703", subjectName: "Computer Networks and Protocols", credits: 3, subjectType: "theory" },
        { subjectCode: "BECPRJ706", subjectName: "Capstone Project Work – Phase II", credits: 4, subjectType: "lab" },
      ],
      "8": [
        { subjectCode: "BECPRJ801", subjectName: "Project Work / Internship", credits: 8, subjectType: "lab" },
        { subjectCode: "BECPRJ802", subjectName: "Technical Seminar", credits: 1, subjectType: "theory" },
        { subjectCode: "BECPRJ803", subjectName: "Research / Professional Practice", credits: 3, subjectType: "lab" },
      ],
    },
    ISE: {
      "1": [
        { subjectCode: "BMATS101", subjectName: "Mathematics-I for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BPHYS102", subjectName: "Applied Physics for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BPOPS103", subjectName: "Principles of Programming Using C", credits: 3, subjectType: "theory" },
        { subjectCode: "BESCK104A", subjectName: "Introduction to Electronics Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BENGK105", subjectName: "Communicative English", credits: 1, subjectType: "theory" },
        { subjectCode: "BPHYL106", subjectName: "Applied Physics Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BPOPL107", subjectName: "C Programming Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BIDTK158", subjectName: "Innovation and Design Thinking", credits: 3, subjectType: "theory" },
      ],
      "2": [
        { subjectCode: "BMATS201", subjectName: "Mathematics-II for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BCHES202", subjectName: "Applied Chemistry for CSE Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BICS203", subjectName: "Introduction to Computer Science", credits: 3, subjectType: "theory" },
        { subjectCode: "BESCK204B", subjectName: "Introduction to Civil Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BKSKK205", subjectName: "Samskrutika Kannada / Constitution of India", credits: 1, subjectType: "theory" },
        { subjectCode: "BCHEL206", subjectName: "Applied Chemistry Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BICSL207", subjectName: "Computer Science Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BSFHK258", subjectName: "Scientific Foundation of Health", credits: 3, subjectType: "theory" },
      ],
      "3": [
        { subjectCode: "BCS301", subjectName: "Mathematics for Computer Science", credits: 4, subjectType: "theory" },
        { subjectCode: "BCS302", subjectName: "Data Structures and Applications", credits: 4, subjectType: "theory" },
        { subjectCode: "BCS303", subjectName: "Digital Design and Computer Organization", credits: 4, subjectType: "theory" },
        { subjectCode: "BCS304", subjectName: "Operating Systems", credits: 3, subjectType: "theory" },
        { subjectCode: "BCS305", subjectName: "Object Oriented Programming with C++ and Java", credits: 3, subjectType: "theory" },
        { subjectCode: "BCSL306", subjectName: "Data Structures Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BCS307", subjectName: "Universal Human Values", credits: 1, subjectType: "theory" },
      ],
      "4": [
        { subjectCode: "BCS401", subjectName: "Microcontrollers", credits: 3, subjectType: "theory" },
        { subjectCode: "BCS402", subjectName: "Analysis and Design of Algorithms", credits: 4, subjectType: "theory" },
        { subjectCode: "BCS403", subjectName: "Database Management Systems", credits: 4, subjectType: "theory" },
        { subjectCode: "BCS404", subjectName: "Biology for Computer Engineers", credits: 3, subjectType: "theory" },
        { subjectCode: "BCS405", subjectName: "ADA Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BCSL406", subjectName: "Database Management Systems Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BCS407", subjectName: "Discrete Mathematical Structures", credits: 4, subjectType: "theory" },
      ],
      "5": [
        { subjectCode: "BCS501", subjectName: "Software Engineering & Project Management", credits: 4, subjectType: "theory" },
        { subjectCode: "BCS502", subjectName: "Computer Networks", credits: 4, subjectType: "theory" },
        { subjectCode: "BCS503", subjectName: "Theory of Computation", credits: 3, subjectType: "theory" },
        { subjectCode: "BCS515B", subjectName: "Artificial Intelligence", credits: 3, subjectType: "theory" },
        { subjectCode: "BCSL504", subjectName: "Web Technology Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BAIL504", subjectName: "Data Visualization Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BRMK557", subjectName: "Research Methodology and IPR", credits: 2, subjectType: "theory" },
        { subjectCode: "BESK508", subjectName: "Environmental Studies", credits: 1, subjectType: "theory" },
      ],
      "6": [
        { subjectCode: "BCS601", subjectName: "Cloud Computing", credits: 4, subjectType: "theory" },
        { subjectCode: "BCS602", subjectName: "Machine Learning", credits: 3, subjectType: "theory" },
        { subjectCode: "BIS601", subjectName: "Full Stack Development", credits: 3, subjectType: "theory" },
        { subjectCode: "BCSL606", subjectName: "Machine Learning Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BIKS609", subjectName: "Indian Knowledge System", credits: 1, subjectType: "theory" },
        { subjectCode: "BCSL657B", subjectName: "React", credits: 1, subjectType: "lab" },
        { subjectCode: "BAIL657C", subjectName: "Generative AI", credits: 1, subjectType: "lab" },
        { subjectCode: "BCSL657D", subjectName: "DevOps", credits: 1, subjectType: "lab" },
      ],
      "7": [
        { subjectCode: "BCS701", subjectName: "Internet of Things", credits: 3, subjectType: "theory" },
        { subjectCode: "BCS714D", subjectName: "Big Data Analytics", credits: 3, subjectType: "theory" },
        { subjectCode: "BCS702", subjectName: "Cloud Computing", credits: 3, subjectType: "theory" },
        { subjectCode: "BCS704", subjectName: "Project Phase 1", credits: 2, subjectType: "lab" },
      ],
      "8": [
        { subjectCode: "BCS801", subjectName: "Project Phase 2", credits: 8, subjectType: "lab" },
        { subjectCode: "BCS802", subjectName: "Technical Seminar", credits: 1, subjectType: "theory" },
        { subjectCode: "BCS803", subjectName: "Internship / Professional Practice", credits: 3, subjectType: "lab" },
      ],
    },
    ME: {
      "1": [
        { subjectCode: "BMATE101", subjectName: "Mathematics-I for ME Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BPHYS102", subjectName: "Applied Physics", credits: 4, subjectType: "theory" },
        { subjectCode: "BEME103", subjectName: "Elements of Mechanical Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BESCK104C", subjectName: "Introduction to Mechanical Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BENGK105", subjectName: "Communicative English", credits: 1, subjectType: "theory" },
        { subjectCode: "BPHYL106", subjectName: "Applied Physics Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BEMEL107", subjectName: "Mechanical Engineering Workshop", credits: 1, subjectType: "lab" },
        { subjectCode: "BIDTK158", subjectName: "Innovation and Design Thinking", credits: 3, subjectType: "theory" },
      ],
      "2": [
        { subjectCode: "BMATE201", subjectName: "Mathematics-II for ME Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BCHES202", subjectName: "Applied Chemistry", credits: 4, subjectType: "theory" },
        { subjectCode: "BEEE203", subjectName: "Basic Electrical Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BESCK204A", subjectName: "Introduction to Electronics Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BKSKK205", subjectName: "Samskrutika Kannada / Constitution of India", credits: 1, subjectType: "theory" },
        { subjectCode: "BCHEL206", subjectName: "Applied Chemistry Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BEEL207", subjectName: "Electrical Engineering Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BSFHK258", subjectName: "Scientific Foundation of Health", credits: 3, subjectType: "theory" },
      ],
      "3": [
        { subjectCode: "BMATM301", subjectName: "Mathematics-III for ME Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BME302", subjectName: "Materials Science", credits: 4, subjectType: "theory" },
        { subjectCode: "BME303", subjectName: "Basic Thermodynamics", credits: 4, subjectType: "theory" },
        { subjectCode: "BME304", subjectName: "Mechanics of Materials", credits: 3, subjectType: "theory" },
        { subjectCode: "BME305", subjectName: "Manufacturing Process I", credits: 3, subjectType: "theory" },
        { subjectCode: "BMEL306", subjectName: "Machine Shop and Foundry Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BME307", subjectName: "Universal Human Values", credits: 1, subjectType: "theory" },
      ],
      "4": [
        { subjectCode: "BME401", subjectName: "Applied Thermodynamics", credits: 4, subjectType: "theory" },
        { subjectCode: "BME402", subjectName: "Fluid Mechanics", credits: 4, subjectType: "theory" },
        { subjectCode: "BME403", subjectName: "Kinematics of Machinery", credits: 4, subjectType: "theory" },
        { subjectCode: "BME404", subjectName: "Manufacturing Process II", credits: 3, subjectType: "theory" },
        { subjectCode: "BMEL405", subjectName: "Mechanical Measurements Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BMEL406", subjectName: "Foundry and Forging Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BME407", subjectName: "Biology for Engineers", credits: 3, subjectType: "theory" },
      ],
      "5": [
        { subjectCode: "BME501", subjectName: "Dynamics of Machinery", credits: 4, subjectType: "theory" },
        { subjectCode: "BME502", subjectName: "Turbo Machinery", credits: 4, subjectType: "theory" },
        { subjectCode: "BME503", subjectName: "Design of Machine Elements I", credits: 3, subjectType: "theory" },
        { subjectCode: "BME504", subjectName: "Heat Transfer", credits: 3, subjectType: "theory" },
        { subjectCode: "BMEL505", subjectName: "Fluid Mechanics and Machines Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BRMK557", subjectName: "Research Methodology and IPR", credits: 2, subjectType: "theory" },
        { subjectCode: "BESK508", subjectName: "Environmental Studies", credits: 1, subjectType: "theory" },
      ],
      "6": [
        { subjectCode: "BME601", subjectName: "Design of Machine Elements II", credits: 4, subjectType: "theory" },
        { subjectCode: "BME602", subjectName: "Finite Element Analysis", credits: 3, subjectType: "theory" },
        { subjectCode: "BME603", subjectName: "Operations Research", credits: 3, subjectType: "theory" },
        { subjectCode: "BMEL606", subjectName: "Heat Transfer Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BMEL607", subjectName: "CAD / CAM Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BIKS609", subjectName: "Indian Knowledge System", credits: 1, subjectType: "theory" },
      ],
      "7": [
        { subjectCode: "BME701", subjectName: "Control Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BME702", subjectName: "Robotics", credits: 3, subjectType: "theory" },
        { subjectCode: "BME703", subjectName: "Non-Traditional Machining", credits: 3, subjectType: "theory" },
        { subjectCode: "BME704", subjectName: "Project Phase 1", credits: 2, subjectType: "lab" },
      ],
      "8": [
        { subjectCode: "BME801", subjectName: "Project Phase 2", credits: 8, subjectType: "lab" },
        { subjectCode: "BME802", subjectName: "Technical Seminar", credits: 1, subjectType: "theory" },
        { subjectCode: "BME803", subjectName: "Internship / Professional Practice", credits: 3, subjectType: "lab" },
      ],
    },
    CV: {
      "1": [
        { subjectCode: "BMATE101", subjectName: "Mathematics-I for ME Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BPHYS102", subjectName: "Applied Physics", credits: 4, subjectType: "theory" },
        { subjectCode: "BCVE103", subjectName: "Elements of Civil Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BESCK204B", subjectName: "Introduction to Civil Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BENGK105", subjectName: "Communicative English", credits: 1, subjectType: "theory" },
        { subjectCode: "BPHYL106", subjectName: "Applied Physics Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BCVEL107", subjectName: "Surveying Practice", credits: 1, subjectType: "lab" },
        { subjectCode: "BIDTK158", subjectName: "Innovation and Design Thinking", credits: 3, subjectType: "theory" },
      ],
      "2": [
        { subjectCode: "BMATE201", subjectName: "Mathematics-II for ME Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BCHES202", subjectName: "Applied Chemistry", credits: 4, subjectType: "theory" },
        { subjectCode: "BEEE203", subjectName: "Basic Electrical Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BESCK104C", subjectName: "Introduction to Mechanical Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BKSKK205", subjectName: "Samskrutika Kannada / Constitution of India", credits: 1, subjectType: "theory" },
        { subjectCode: "BCHEL206", subjectName: "Applied Chemistry Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BEEL207", subjectName: "Electrical Engineering Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BSFHK258", subjectName: "Scientific Foundation of Health", credits: 3, subjectType: "theory" },
      ],
      "3": [
        { subjectCode: "BMATCV301", subjectName: "Mathematics-III for CV Engineering", credits: 4, subjectType: "theory" },
        { subjectCode: "BCV302", subjectName: "Building Materials and Construction", credits: 4, subjectType: "theory" },
        { subjectCode: "BCV303", subjectName: "Engineering Geology", credits: 4, subjectType: "theory" },
        { subjectCode: "BCV304", subjectName: "Strength of Materials", credits: 3, subjectType: "theory" },
        { subjectCode: "BCV305", subjectName: "Fluid Mechanics", credits: 3, subjectType: "theory" },
        { subjectCode: "BCVL306", subjectName: "Surveying Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BCV307", subjectName: "Universal Human Values", credits: 1, subjectType: "theory" },
      ],
      "4": [
        { subjectCode: "BCV401", subjectName: "Concrete Technology", credits: 4, subjectType: "theory" },
        { subjectCode: "BCV402", subjectName: "Structural Analysis I", credits: 4, subjectType: "theory" },
        { subjectCode: "BCV403", subjectName: "Hydraulics and Hydraulic Machinery", credits: 4, subjectType: "theory" },
        { subjectCode: "BCV404", subjectName: "Geotechnical Engineering I", credits: 3, subjectType: "theory" },
        { subjectCode: "BCVL405", subjectName: "Building Materials Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BCVL406", subjectName: "Fluid Mechanics Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BCV407", subjectName: "Biology for Engineers", credits: 3, subjectType: "theory" },
      ],
      "5": [
        { subjectCode: "BCV501", subjectName: "Structural Analysis II", credits: 4, subjectType: "theory" },
        { subjectCode: "BCV502", subjectName: "Design of RC Structures", credits: 4, subjectType: "theory" },
        { subjectCode: "BCV503", subjectName: "Geotechnical Engineering II", credits: 3, subjectType: "theory" },
        { subjectCode: "BCV504", subjectName: "Transportation Engineering I", credits: 3, subjectType: "theory" },
        { subjectCode: "BCVL505", subjectName: "Geotechnical Engineering Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BRMK557", subjectName: "Research Methodology and IPR", credits: 2, subjectType: "theory" },
        { subjectCode: "BESK508", subjectName: "Environmental Studies", credits: 1, subjectType: "theory" },
      ],
      "6": [
        { subjectCode: "BCV601", subjectName: "Design of Steel Structures", credits: 4, subjectType: "theory" },
        { subjectCode: "BCV602", subjectName: "Environmental Engineering I", credits: 3, subjectType: "theory" },
        { subjectCode: "BCV603", subjectName: "Transportation Engineering II", credits: 3, subjectType: "theory" },
        { subjectCode: "BCVL606", subjectName: "Concrete and Highway Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BCVL607", subjectName: "CAD Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BIKS609", subjectName: "Indian Knowledge System", credits: 1, subjectType: "theory" },
      ],
      "7": [
        { subjectCode: "BCV701", subjectName: "Estimation and Valuation", credits: 3, subjectType: "theory" },
        { subjectCode: "BCV702", subjectName: "Environmental Engineering II", credits: 3, subjectType: "theory" },
        { subjectCode: "BCV703", subjectName: "Construction Management", credits: 3, subjectType: "theory" },
        { subjectCode: "BCV704", subjectName: "Project Phase 1", credits: 2, subjectType: "lab" },
      ],
      "8": [
        { subjectCode: "BCV801", subjectName: "Project Phase 2", credits: 8, subjectType: "lab" },
        { subjectCode: "BCV802", subjectName: "Technical Seminar", credits: 1, subjectType: "theory" },
        { subjectCode: "BCV803", subjectName: "Internship / Professional Practice", credits: 3, subjectType: "lab" },
      ],
    },
    EEE: {
      "1": [
        { subjectCode: "BMATE101", subjectName: "Mathematics-I for ME Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BPHYS102", subjectName: "Applied Physics", credits: 4, subjectType: "theory" },
        { subjectCode: "BEEE103", subjectName: "Basic Electrical Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BESCK104A", subjectName: "Introduction to Electronics Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BENGK105", subjectName: "Communicative English", credits: 1, subjectType: "theory" },
        { subjectCode: "BPHYL106", subjectName: "Applied Physics Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BEEL107", subjectName: "Electrical Engineering Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BIDTK158", subjectName: "Innovation and Design Thinking", credits: 3, subjectType: "theory" },
      ],
      "2": [
        { subjectCode: "BMATE201", subjectName: "Mathematics-II for ME Stream", credits: 4, subjectType: "theory" },
        { subjectCode: "BCHES202", subjectName: "Applied Chemistry", credits: 4, subjectType: "theory" },
        { subjectCode: "BPOPS103", subjectName: "Principles of Programming Using C", credits: 3, subjectType: "theory" },
        { subjectCode: "BESCK204B", subjectName: "Introduction to Civil Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BKSKK205", subjectName: "Samskrutika Kannada / Constitution of India", credits: 1, subjectType: "theory" },
        { subjectCode: "BCHEL206", subjectName: "Applied Chemistry Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BPOPL207", subjectName: "C Programming Laboratory", credits: 1, subjectType: "lab" },
        { subjectCode: "BSFHK258", subjectName: "Scientific Foundation of Health", credits: 3, subjectType: "theory" },
      ],
      "3": [
        { subjectCode: "BMATEE301", subjectName: "Mathematics-III for EE Engineering", credits: 4, subjectType: "theory" },
        { subjectCode: "BEE302", subjectName: "Electric Circuit Analysis", credits: 4, subjectType: "theory" },
        { subjectCode: "BEE303", subjectName: "Analog Electronic Circuits", credits: 4, subjectType: "theory" },
        { subjectCode: "BEE304", subjectName: "Electrical Machines I", credits: 3, subjectType: "theory" },
        { subjectCode: "BEE305", subjectName: "Digital Electronics", credits: 3, subjectType: "theory" },
        { subjectCode: "BEEL306", subjectName: "Electrical Circuits and Machines Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BEE307", subjectName: "Universal Human Values", credits: 1, subjectType: "theory" },
      ],
      "4": [
        { subjectCode: "BEE401", subjectName: "Electrical Machines II", credits: 4, subjectType: "theory" },
        { subjectCode: "BEE402", subjectName: "Transmission and Distribution", credits: 4, subjectType: "theory" },
        { subjectCode: "BEE403", subjectName: "Signals and Systems", credits: 4, subjectType: "theory" },
        { subjectCode: "BEE404", subjectName: "Control Systems", credits: 3, subjectType: "theory" },
        { subjectCode: "BEEL405", subjectName: "Electrical Machines Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BEEL406", subjectName: "Electronics Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BEE407", subjectName: "Biology for Engineers", credits: 3, subjectType: "theory" },
      ],
      "5": [
        { subjectCode: "BEE501", subjectName: "Power Electronics", credits: 4, subjectType: "theory" },
        { subjectCode: "BEE502", subjectName: "Power System Analysis", credits: 4, subjectType: "theory" },
        { subjectCode: "BEE503", subjectName: "Microcontrollers and Applications", credits: 3, subjectType: "theory" },
        { subjectCode: "BEE504", subjectName: "Measurement and Instrumentation", credits: 3, subjectType: "theory" },
        { subjectCode: "BEEL505", subjectName: "Power Electronics Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BRMK557", subjectName: "Research Methodology and IPR", credits: 2, subjectType: "theory" },
        { subjectCode: "BESK508", subjectName: "Environmental Studies", credits: 1, subjectType: "theory" },
      ],
      "6": [
        { subjectCode: "BEE601", subjectName: "Power System Protection", credits: 4, subjectType: "theory" },
        { subjectCode: "BEE602", subjectName: "Electric Drives", credits: 3, subjectType: "theory" },
        { subjectCode: "BEE603", subjectName: "Renewable Energy Sources", credits: 3, subjectType: "theory" },
        { subjectCode: "BEEL606", subjectName: "Power System Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BEEL607", subjectName: "Microcontroller Lab", credits: 1, subjectType: "lab" },
        { subjectCode: "BIKS609", subjectName: "Indian Knowledge System", credits: 1, subjectType: "theory" },
      ],
      "7": [
        { subjectCode: "BEE701", subjectName: "High Voltage Engineering", credits: 3, subjectType: "theory" },
        { subjectCode: "BEE702", subjectName: "Smart Grid Technology", credits: 3, subjectType: "theory" },
        { subjectCode: "BEE703", subjectName: "Energy Auditing and Management", credits: 3, subjectType: "theory" },
        { subjectCode: "BEE704", subjectName: "Project Phase 1", credits: 2, subjectType: "lab" },
      ],
      "8": [
        { subjectCode: "BEE801", subjectName: "Project Phase 2", credits: 8, subjectType: "lab" },
        { subjectCode: "BEE802", subjectName: "Technical Seminar", credits: 1, subjectType: "theory" },
        { subjectCode: "BEE803", subjectName: "Internship / Professional Practice", credits: 3, subjectType: "lab" },
      ],
    },
  },
};

// Helper functions
export function getSchemes(): string[] {
  return Object.keys(vtuSubjects);
}

export function getBranches(scheme: string): string[] {
  return Object.keys(vtuSubjects[scheme] ?? {});
}

export function getSemesters(scheme: string, branch: string): string[] {
  return Object.keys(vtuSubjects[scheme]?.[branch] ?? {});
}

export function getSubjects(scheme: string, branch: string, semester: string): Subject[] {
  return vtuSubjects[scheme]?.[branch]?.[semester] ?? [];
}

export function getTotalCredits(subjects: Subject[]): number {
  return subjects.reduce((sum, s) => sum + s.credits, 0);
}
