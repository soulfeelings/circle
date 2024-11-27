// Define the Route type
import Kanban from "./ui/Kanban/Kanban.tsx";
import {Teams} from "./ui/Teams/Teams.tsx";
import {Projects} from "./ui/Projects/Projects.tsx";
import {Characters} from "./ui/Characters/Characters.tsx";
import {CharacterItems} from "./ui/CharacterItems/CharacterItems.tsx";
import {Canvas} from "./ui/Canvas";
import {Users} from "./ui/Users/Users.tsx";
import {Sprints} from "./ui/Sprints/Sprints.tsx";
import {Okr} from "./ui/Okr/Okr.tsx";
import {Money} from "./ui/Money/Money.tsx";
import {Tasks} from "./ui/Tasks/Tasks.tsx";
import {Companies} from "./ui/Companies/Companies.tsx";

interface AppRoute {
    path: string;
    label: string;
    element: JSX.Element;
}

// Define the routes array
export const routes: AppRoute[] = [
    {path: "/kanban", label: "Kanban", element: <Kanban/>},
    {path: "/companies", label: "Companies", element: <Companies/>},
    {path: "/teams", label: "Teams", element: <Teams/>},
    {path: "/users", label: "Users", element: <Users/>},
    {path: "/projects", label: "Projects", element: <Projects/>},
    {path: "/tasks", label: "Tasks", element: <Tasks/>},
    {path: "/sprints", label: "Sprints", element: <Sprints/>},
    {path: "/okr", label: "Okr", element: <Okr/>},
    {path: "/characters", label: "Characters", element: <Characters/>},
    {path: "/character_items", label: "Character Items", element: <CharacterItems/>},
    {path: "/money", label: "Money for tasks", element: <Money/>},
    {path: "/canvas", label: "Canvas", element: <Canvas/>},
];