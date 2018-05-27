export const tasks = {
    1: {
      id: 1,
      taskTitle: 'Very important task',
      diagnosis: 'gagi',
      goal: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
      taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.  Duis aute irure dolorin reprehenderit in voluptate velit esse cillum dolore eu fugiatnulla pariatur. Excepteur sint occaecat cupidatat non proident,sunt in culpa qui officia deserunt mollit anim id est laborum",
      time: 'Every day',
      circlers: [],
    },
    2: {
      id: 2,
      taskTitle: 'Very important task',
      diagnosis: 'bisi',
      goal: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
      taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.  Duis aute irure dolorin reprehenderit in voluptate velit esse cillum dolore eu fugiatnulla pariatur. Excepteur sint occaecat cupidatat non proident,sunt in culpa qui officia deserunt mollit anim id est laborum",
      time: 'Every day',
      circlers: [],
    },
    3: {
      id: 3,
      taskTitle: 'Very important task',
      diagnosis: 'fudigagi',
      goal: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
      taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.  Duis aute irure dolorin reprehenderit in voluptate velit esse cillum dolore eu fugiatnulla pariatur. Excepteur sint occaecat cupidatat non proident,sunt in culpa qui officia deserunt mollit anim id est laborum",
      time: 'Every day',
      circlers: [],
    },
    4: {
      id: 4,
      taskTitle: 'Very important task',
      diagnosis: 'bisipimmel',
      goal: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
      taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.  Duis aute irure dolorin reprehenderit in voluptate velit esse cillum dolore eu fugiatnulla pariatur. Excepteur sint occaecat cupidatat non proident,sunt in culpa qui officia deserunt mollit anim id est laborum",
      time: 'Every day',
      circlers: [],
    },
}

export const assessment_cha2 = {
  1: {
    id: 1,
    section: 'C',
    title: 'Cognitive skills for daily decision making',
    description: 'Making decisions regarding tasks of daily life, e.g. when to get up or have meals, which clothes to wear, or activites to do',
    responseType: 'ordinal-scale',
    responses: [
      {id: 1, title: 'Independent', description: 'Decisions consistent, reasonable and safe'},
      {id: 2, title: 'Modified independence', description: 'Some difficulty in new situations only'},
      {id: 3, title: 'Minimally impaired', description: 'In specific recurring situations, deicsions become poor or unsafe; cues / supervision necessary at those times'},
      {id: 4, title: 'Severly impaired', description: 'Never or rarely makes decisions'},
      {id: 5, title: 'No discernable consciousness', description: ''},
    ],
    hasSubQuestions: false,
    subQuestions: undefined,
  },
  2: {
    id: 2,
    section: 'C',
    title: 'Memory / recall ability',
    description: 'Ability to recall of what was learned or known',
    responseType: 'boolean',
    responses: [
      {id: 1, title: 'Yes, memory ok', description: ''},
      {id: 2, title: 'Memory problem', description: ''},
    ],
    hasSubQuestions: true,
    subQuestions: {
      a: {
        title: 'Short-term memory',
        description: 'Seems / appears to recall after 5 minutes',
        responseType: 'boolean',
        responses: [
          {id: 1, title: 'Yes, memory ok', description: ''},
          {id: 2, title: 'Memory problem', description: ''},
        ]
      },
      b: {
        title: 'Short-term memory',
        description: 'Seems / appears to recall after 5 minutes',
        responseType: 'boolean',
        responses: [
          {id: 1, title: 'Yes, memory ok', description: ''},
          {id: 2, title: 'Memory problem', description: ''},
        ]
      },
      c: {
        title: 'Short-term memory',
        description: 'Seems / appears to recall after 5 minutes',
        responseType: 'boolean',
        responses: [
          {id: 1, title: 'Yes, memory ok', description: ''},
          {id: 2, title: 'Memory problem', description: ''},
        ]
      },
    },
  },
  3: {
    id: 3,
    section: 'A',
    title: 'Personal Information',
    description: '',
    responseType: 'personal-information',
    responses: [
    ],
    hasSubQuestions: false,
    subQuestions: undefined,
  },
}

export const assessment_cha = {
  1: {
    id: 1,
    section: 'C',
    title: 'Cognitive skills for daily decision making',
    description: 'Making decisions regarding tasks of daily life, e.g. when to get up or have meals, which clothes to wear, or activites to do',
    responseType: 'ordinal-scale',
    responses: [
      {id: 1, title: 'Independent', description: 'Decisions consistent, reasonable and safe', checked: false},
      {id: 2, title: 'Modified independence', description: 'Some difficulty in new situations only', checked: false},
      {id: 3, title: 'Minimally impaired', description: 'In specific recurring situations, deicsions become poor or unsafe; cues / supervision necessary at those times', checked: false},
      {id: 4, title: 'Severly impaired', description: 'Never or rarely makes decisions', checked: false},
      {id: 5, title: 'No discernable consciousness', description: '', checked: false},
    ],
  },
  2: {
    id: 2,
    section: 'C',
    questionId: 2,
    title: 'Memory / recall ability',
    description: 'Ability to recall of what was learned or known',
    responseType: 'boolean',
    responses: [
      {id: 1, title: 'Yes, memory ok', description: '', checked: false},
      {id: 2, title: 'Memory problem', description: '', checked: false},
    ],
  },
  3: {
    id: 3,
    section: 'C',
    questionId: '2a',
    title: 'Short-term memory',
    description: 'Seems / appears to recall after 5 minutes',
    responseType: 'boolean',
    responses: [
      {id: 1, title: 'Yes, memory ok', description: '', checked: false},
      {id: 2, title: 'Memory problem', description: '', checked: false},
    ],
  },
  4: {
    id: 4,
    section: 'C',
    questionId: '2b',
    title: 'Short-term memory',
    description: 'Seems / appears to recall after 5 minutes',
    responseType: 'boolean',
    responses: [
      {id: 1, title: 'Yes, memory ok', description: '', checked: false},
      {id: 2, title: 'Memory problem', description: '', checked: false},
    ],
  },
  5: {
    id: 5,
    section: 'C',
    questionId: '2b',
    title: 'Short-term memory',
    description: 'Seems / appears to recall after 5 minutes',
    responseType: 'boolean',
    responses: [
      {id: 1, title: 'Yes, memory ok', description: '', checked: false},
      {id: 2, title: 'Memory problem', description: '', checked: false},
    ],
  },
  6: {
    id: 6,
    section: 'A',
    questionId: '',
    title: 'Personal Information',
    description: '',
    responseType: 'personal-information',
    responses: [
    ],
  },
}

const responseTypes = ['boolean', 'ordinal-scale', 'likert-scale', 'interval-scale', 'matrix', 'open', 'multi-option', 'personal-information']