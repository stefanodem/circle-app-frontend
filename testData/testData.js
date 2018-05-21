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

export const assessment_cha = {
  1: {
    id: 1,
    section: 'C',
    title: 'Cognitive skills for daily decision making',
    description: 'Making decisions regarding tasks of daily life, e.g. when to get up or have meals, which clothes to wear, or activites to do',
    responseType: 'ordinal-scale',
    responses: [
      {title: 'Independent', description: 'Decisions consistens, reasonable and safe'},
      {title: 'Modified independence', description: 'Some difficulty in new situations only'},
      {title: 'Minimally impaired', description: 'In specific recurring situations, deicsions become poor or unsafe; cues / supervision necessary at those times'},
      {title: 'Severly impaired', description: 'Never or rarely makes decisions'},
      {title: 'No discernable consciousness', description: ''},
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
      {title: 'Yes, memory ok', description: ''},
      {title: 'Memory problem', description: ''},
    ],
    hasSubQuestions: true,
    subQuestions: {
      a: {
        title: 'Short-term memory',
        description: 'Seems / appears to recall after 5 minutes',
        responseType: 'boolean',
        responses: [
          {title: 'Yes, memory ok', description: ''},
          {title: 'Memory problem', description: ''},
        ]
      },
      b: {
        title: 'Short-term memory',
        description: 'Seems / appears to recall after 5 minutes',
        responseType: 'boolean',
        responses: [
          {title: 'Yes, memory ok', description: ''},
          {title: 'Memory problem', description: ''},
        ]
      },
      c: {
        title: 'Short-term memory',
        description: 'Seems / appears to recall after 5 minutes',
        responseType: 'boolean',
        responses: [
          {title: 'Yes, memory ok', description: ''},
          {title: 'Memory problem', description: ''},
        ]
      },
    },
  },
}

const responseTypes = ['boolean', 'ordinal-scale', 'likert-scale', 'matrix', 'open', 'multi-option']