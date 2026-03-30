export type TaskRow = {
  no: number
  tasksNo: string
  dateTime: string
  description: string
  inspector: string
  condition: string
  priority: string
  planStart: string
  completed: string
}

export const tasksDummy: Record<string, TaskRow[]> = {
  DD001: [
    {
      no: 1,
      tasksNo: 'FLR2305-001',
      dateTime: '3-10-23 0:00',
      description: 'Please Repair Leaking Cylinder Head',
      inspector: '254875 - Eduard Salindeho',
      condition: 'Leaking',
      priority: 'P#1',
      planStart: '3-10-23 0:00',
      completed: '3-10-23 0:00',
    },
    {
      no: 2,
      tasksNo: 'FLR2305-002',
      dateTime: '2-10-23 0:00',
      description: 'Radiator Broken',
      inspector: '254875 - Eduard Salindeho',
      condition: 'Broken',
      priority: 'P#1',
      planStart: '2-10-23 0:00',
      completed: '2-10-23 0:00',
    },
    {
      no: 3,
      tasksNo: 'FLR2305-003',
      dateTime: '3-9-23 0:00',
      description: 'Cylinder Head Schedule to replace',
      inspector: '254875 - Eduard Salindeho',
      condition: 'Replace',
      priority: 'P#2',
      planStart: '3-9-23 0:00',
      completed: '3-9-23 0:00',
    },
    {
      no: 4,
      tasksNo: 'FLR2305-004',
      dateTime: '3-8-23 0:00',
      description: 'Final Drive Jam',
      inspector: '254875 - Eduard Salindeho',
      condition: 'Jam',
      priority: 'P#2',
      planStart: '3-8-23 0:00',
      completed: '3-8-23 0:00',
    },
  ],
}
