const DEPARTMENT_CODE_MAP = {
  "30": "CSE",
  "40": "ECE",
  "50": "CIVIL",
  "55": "EEE",
  "65": "MECH",
  "80": "AIDS",
  "90": "CSIT"
};

const SUBJECT_BY_DEPARTMENT = {
  CSE: { subject_code: "CS301", subject_name: "Design and Analysis of Algorithms" },
  ECE: { subject_code: "EC302", subject_name: "Signals and Systems" },
  CIVIL: { subject_code: "CE210", subject_name: "Structural Analysis" },
  EEE: { subject_code: "EE204", subject_name: "Digital Circuits" },
  MECH: { subject_code: "ME220", subject_name: "Thermal Engineering" },
  AIDS: { subject_code: "AI301", subject_name: "Artificial Intelligence" },
  CSIT: { subject_code: "IT401", subject_name: "Cloud Computing" },
  GENERAL: { subject_code: "EX101", subject_name: "Common Examination" }
};

export const defaultBatchForm = {
  startRoll: "2520030136",
  endRoll: "2520030170",
  batchSize: "30"
};

export const demoRequest = {
  exam_id: "EXAM-AI-2026",
  exam_name: "End Semester AI Examination",
  slot: "2026-06-02 FN",
  policy: "strict_gap",
  classrooms: [
    {
      room_id: "A101",
      name: "A Block 101",
      rows: 4,
      cols: 5,
      invigilator_ids: ["INV-01"],
      gap_seats: ["A101-R1C2", "A101-R1C4", "A101-R2C3", "A101-R3C2", "A101-R3C4", "A101-R4C3"]
    },
    {
      room_id: "B204",
      name: "B Block 204",
      rows: 4,
      cols: 5,
      invigilator_ids: ["INV-02"],
      accessible_rows: [0]
    },
    {
      room_id: "C303",
      name: "C Block 303",
      rows: 4,
      cols: 5,
      invigilator_ids: ["INV-03"]
    }
  ]
};

export const demoOverview = {
  platform_name: "Smart AI Examination Seating Arrangement System",
  modules: [
    "Range-based batch generation",
    "Room visualization",
    "Student lookup",
    "Reasoning trace viewer",
    "Search metrics showcase"
  ],
  roles: ["student", "faculty", "admin"],
  status_cards: [
    { label: "Batch Size Limit", value: 30 },
    { label: "Rooms Modeled", value: 3 },
    { label: "Total Seat Capacity", value: 60 },
    { label: "A101 Reserved Gaps", value: 6 }
  ]
};

function getDepartmentFromRoll(rollNumber) {
  return DEPARTMENT_CODE_MAP[rollNumber.slice(5, 7)] || "GENERAL";
}

function getSubjectForDepartment(department) {
  return SUBJECT_BY_DEPARTMENT[department] || SUBJECT_BY_DEPARTMENT.GENERAL;
}

function buildSeatPool(classrooms) {
  const seats = classrooms.flatMap((room) =>
    Array.from({ length: room.rows * room.cols }, (_, index) => {
      const row = Math.floor(index / room.cols);
      const col = index % room.cols;
      const seatLabel = `${room.room_id}-R${row + 1}C${col + 1}`;
      return {
        room_id: room.room_id,
        room_name: room.name,
        row,
        col,
        seat_label: seatLabel,
        is_gap: room.gap_seats?.includes(seatLabel) || false,
        preferred: (row + col) % 2 === 0
      };
    })
  );

  const assignableSeats = seats.filter((seat) => !seat.is_gap);

  return [
    ...assignableSeats.filter((seat) => seat.room_id === "A101" && seat.preferred),
    ...assignableSeats.filter((seat) => seat.room_id === "B204" && seat.preferred),
    ...assignableSeats.filter((seat) => seat.room_id === "C303" && seat.preferred),
    ...assignableSeats.filter((seat) => seat.room_id === "A101" && !seat.preferred),
    ...assignableSeats.filter((seat) => seat.room_id === "B204" && !seat.preferred),
    ...assignableSeats.filter((seat) => seat.room_id === "C303" && !seat.preferred)
  ];
}

function createStudentsFromRange({ startRoll, endRoll, batchSize }, examSlot) {
  const numericStart = Number(startRoll);
  const numericEnd = Number(endRoll);
  const start = Math.min(numericStart, numericEnd);
  const end = Math.max(numericStart, numericEnd);
  const rollWidth = Math.max(startRoll.length, endRoll.length, 10);
  const limit = Math.max(1, Math.min(Number(batchSize) || 30, 30));
  const totalInRange = Math.max(end - start + 1, 0);
  const count = Math.min(totalInRange, limit);

  return Array.from({ length: count }, (_, index) => {
    const rollNumber = String(start + index).padStart(rollWidth, "0");
    const department = getDepartmentFromRoll(rollNumber);
    const subject = getSubjectForDepartment(department);

    return {
      id: `S${index + 1}`,
      roll_number: rollNumber,
      name: `${department} Student ${String(index + 1).padStart(2, "0")}`,
      department,
      exam_slot: examSlot,
      student_type: "regular",
      attendance_probability: 0.92,
      ...subject
    };
  });
}

function buildAssignments(students, classrooms) {
  const seatPool = buildSeatPool(classrooms);
  const assignedStudents = students.slice(0, seatPool.length);

  return assignedStudents.map((student, index) => {
    const seat = seatPool[index];

    return {
      student_id: student.id,
      roll_number: student.roll_number,
      name: student.name,
      subject_code: student.subject_code,
      department: student.department,
      room_id: seat.room_id,
      room_name: seat.room_name,
      seat_label: seat.seat_label,
      row: seat.row,
      col: seat.col,
      score: Number((0.98 - index * 0.01).toFixed(2)),
      explanation: [
        index < 20
          ? "Placed in a gap-friendly checkerboard seat to preserve spacing."
          : "Placed in the secondary wave after all primary spacing seats were filled.",
        `Allocated from input roll-number range for ${student.department}.`
      ]
    };
  });
}

function buildSearchMetrics(assignments) {
  const count = assignments.length;

  return [
    {
      algorithm: "BFS",
      node_expansions: count + 8,
      runtime_ms: Number((count * 0.04 + 0.18).toFixed(2)),
      peak_frontier: Math.max(3, Math.ceil(count / 6)),
      trace: assignments.slice(0, 3).map((assignment, index) => ({
        state: assignment.roll_number,
        cost: index,
        heuristic: 0,
        frontier_size: index + 1
      }))
    },
    {
      algorithm: "DFS",
      node_expansions: count + 5,
      runtime_ms: Number((count * 0.03 + 0.12).toFixed(2)),
      peak_frontier: Math.max(2, Math.ceil(count / 8)),
      trace: assignments.slice(0, 3).map((assignment, index) => ({
        state: assignment.seat_label,
        cost: index + 1,
        heuristic: 0,
        frontier_size: Math.max(1, 3 - index)
      }))
    },
    {
      algorithm: "A*",
      node_expansions: count + 3,
      runtime_ms: Number((count * 0.02 + 0.1).toFixed(2)),
      peak_frontier: Math.max(2, Math.ceil(count / 10)),
      trace: assignments.slice(0, 3).map((assignment, index) => ({
        state: assignment.room_id,
        cost: index,
        heuristic: Math.max(0, 3 - index),
        frontier_size: Math.max(1, 2 - index + 1)
      }))
    }
  ];
}

function buildReasoningTrace({ startRoll, endRoll, batchSize }, assignments, unassignedStudents) {
  const normalizedStart = Number(startRoll) <= Number(endRoll) ? startRoll : endRoll;
  const normalizedEnd = Number(startRoll) <= Number(endRoll) ? endRoll : startRoll;

  return [
    {
      step: "RANGE_CAPTURE",
      message: `Captured roll-number range ${normalizedStart} to ${normalizedEnd} with a batch limit of ${batchSize}.`
    },
    {
      step: "BATCH_BUILD",
      message: `${assignments.length + unassignedStudents} students were generated from the input range.`
    },
    {
      step: "DEPARTMENT_PARSE",
      message: "Department codes were inferred from digits 6-7 of each roll number."
    },
    {
      step: "GAP_FIRST_ASSIGNMENT",
      message: "A101 reserved gap seats were left empty while checkerboard seats were filled first."
    },
    {
      step: "ROOM_BALANCE",
      message: "Seats were spread across A101, B204, and C303 before using tighter placements."
    },
    {
      step: "FINAL_CHECK",
      message:
        unassignedStudents > 0
          ? `${unassignedStudents} students could not be seated because room capacity was exceeded.`
          : "All generated students were seated successfully."
    }
  ];
}

function buildViolations(totalRequested, assignedCount, capacity) {
  if (assignedCount < totalRequested) {
    return [
      {
        constraint: "room_capacity",
        severity: "warning",
        message: `${totalRequested - assignedCount} students remain unassigned because the classrooms hold only ${capacity} seats.`,
        students: []
      }
    ];
  }

  return [
      {
        constraint: "gap_policy",
        severity: "info",
        message: "A101 gap seats were preserved and primary checkerboard seats were prioritized first.",
        students: []
      }
    ];
}

const demoAlgorithmNotes = {
  peas: {
    exam_seating_agent: {
      performance: "Generate seats directly from roll-number ranges while respecting batch limits."
    },
    invigilator_agent: {
      performance: "Balance supervision coverage across all three modeled rooms."
    },
    student_query_agent: {
      performance: "Provide fast roll-number seat lookup for generated batches."
    }
  },
  probabilistic_ai: {
    rejection_sampling: 0.74,
    likelihood_weighting: 0.69
  }
};

export function createDemoResult(formValues) {
  const students = createStudentsFromRange(formValues, demoRequest.slot);
  const assignments = buildAssignments(students, demoRequest.classrooms);
  const unassignedStudents = students.length - assignments.length;
  const capacity = demoRequest.classrooms.reduce((sum, room) => sum + room.rows * room.cols, 0);
  const usableCapacity = buildSeatPool(demoRequest.classrooms).length;
  const studentLookup = assignments.reduce((accumulator, assignment) => {
    accumulator[assignment.roll_number] = assignment;
    return accumulator;
  }, {});

  return {
    feasible: unassignedStudents === 0,
    assignments,
    violations: buildViolations(students.length, assignments.length, usableCapacity),
    reasoning_trace: buildReasoningTrace(formValues, assignments, unassignedStudents),
    search_metrics: buildSearchMetrics(assignments),
    algorithm_notes: demoAlgorithmNotes,
    analytics: {
      assigned_students: assignments.length,
      unassigned_students: unassignedStudents,
      runtime_ms: Number((students.length * 0.31 + 8.4).toFixed(1)),
      violation_count: unassignedStudents > 0 ? 1 : 0,
      expected_conflict_probability: Number((Math.min(assignments.length, usableCapacity) / usableCapacity * 0.24).toFixed(2))
    },
    student_lookup: studentLookup
  };
}
