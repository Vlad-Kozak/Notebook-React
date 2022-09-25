import { ICategory, INote } from "../helpers/interfaces";
import { ReactComponent as TaskIcon } from "../images/task.svg";
import { ReactComponent as ThoughtIcon } from "../images/thought.svg";
import { ReactComponent as IdeaIcon } from "../images/idea.svg";

interface INotesInitialState {
  notes: INote[];
  categories: ICategory[];
}

export const notesInitialState: INotesInitialState = {
  notes: [
    {
      id: "1",
      name: "Lora`s birthday",
      created: 1613119628048,
      categoryId: "1",
      content: "Pick up the present for Lora",
      archived: true,
    },
    {
      id: "2",
      name: "Dentist",
      created: 1623229618048,
      categoryId: "1",
      content:
        "I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
      archived: false,
    },
    {
      id: "3",
      name: "Dog",
      created: 1633339638048,
      categoryId: "3",
      content: "Make a dog house",
      archived: false,
    },
    {
      id: "4",
      name: "Education",
      created: 1643449648048,
      categoryId: "1",
      content: "Read 5 books",
      archived: false,
    },
    {
      id: "5",
      name: "Password",
      created: 1653559658048,
      categoryId: "2",
      content: "Superman1986",
      archived: false,
    },
    {
      id: "6",
      name: "Work",
      created: 1663669668048,
      categoryId: "3",
      content: "Test hydrocyclone for medium pulp percentage",
      archived: false,
    },
    {
      id: "7",
      name: "Diploma",
      created: 1673779678048,
      categoryId: "1",
      content: "Pick up a diploma from the university 30/09/2022",
      archived: false,
    },
  ],
  categories: [
    {
      id: "1",
      name: "Task",
      imageUrl: TaskIcon,
    },
    {
      id: "2",
      name: "Random Thought",
      imageUrl: ThoughtIcon,
    },
    {
      id: "3",
      name: "Idea",
      imageUrl: IdeaIcon,
    },
  ],
};
