export // Define edges to represent relationships between entities
const initialEdges = [
    { id: 'company-team', source: 'company', target: 'team', label: 'has many' },
    { id: 'company-project', source: 'company', target: 'project', label: 'has many' },
    { id: 'team-user', source: 'team', target: 'user', label: 'has many' },
    { id: 'user-character', source: 'user', target: 'character', label: 'owns' },
    { id: 'user-style', source: 'user', target: 'style', label: 'customizes' },
    { id: 'project-task', source: 'project', target: 'task', label: 'contains' },
    { id: 'project-okr', source: 'project', target: 'okr', label: 'related to' },
    { id: 'okr-objective', source: 'okr', target: 'objective', label: 'has many' },
    { id: 'objective-keyResult', source: 'objective', target: 'keyResult', label: 'measured by' },
];