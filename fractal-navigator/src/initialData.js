const initialData = {
  id: 'root',
  title: 'Home',
  subTasks: [
    {
      id: '1',
      title: 'Project A',
      subTasks: [
        {
          id: '1-1',
          title: 'Task 1',
          subTasks: [],
        },
        {
          id: '1-2',
          title: 'Task 2',
          subTasks: [],
        },
      ],
    },
    {
      id: '2',
      title: 'Project B',
      subTasks: [],
    },
  ],
};

export default initialData;
