# PYTHON CLASSES


class Student:

    def __init__(self, htno, name, branch):
        self.htno = htno
        self.name = name
        self.branch = branch


# FUNCTIONS
# CONSTRAINT SATISFACTION

def is_safe(seating, student, position, cols):

    # Check Left Seat

    if position % cols != 0:

        left_student = seating[position - 1]

        if left_student is not None:

            if left_student.branch == student.branch:
                return False

    # Check Upper Seat

    if position - cols >= 0:

        upper_student = seating[position - cols]

        if upper_student is not None:

            if upper_student.branch == student.branch:
                return False

    return True


# DEGREE HEURISTIC
# Select seat affecting maximum neighbours

def degree_value(position, cols, total):

    degree = 0

    if position % cols != 0:
        degree += 1

    if (position + 1) % cols != 0:
        degree += 1

    if position - cols >= 0:
        degree += 1

    if position + cols < total:
        degree += 1

    return degree


# MRV HEURISTIC
# Minimum Remaining Values

def get_mrv_seat(seating, students, used, cols):

    best_seat = None
    min_options = float("inf")
    best_degree = -1

    for pos in range(len(seating)):

        if seating[pos] is None:

            options = 0

            for i in range(len(students)):

                if not used[i]:

                    if is_safe(
                        seating,
                        students[i],
                        pos,
                        cols
                    ):
                        options += 1

            current_degree = degree_value(
                pos,
                cols,
                len(seating)
            )

            # MRV Selection

            if options < min_options:

                min_options = options
                best_seat = pos
                best_degree = current_degree

            # Degree Heuristic Tie Break

            elif options == min_options:

                if current_degree > best_degree:

                    best_seat = pos
                    best_degree = current_degree

    return best_seat


# FORWARD CHECKING
# Check future seats before continuing

def forward_check(
    seating,
    students,
    used,
    cols
):

    for pos in range(len(seating)):

        if seating[pos] is None:

            possible = False

            for i in range(len(students)):

                if not used[i]:

                    if is_safe(
                        seating,
                        students[i],
                        pos,
                        cols
                    ):

                        possible = True
                        break

            if not possible:
                return False

    return True


# BACKTRACKING
# RECURSION
# STATE SPACE SEARCH


def backtrack(
    students,
    seating,
    used,
    pos,
    cols
):

    # Goal State

    if all(
        seat is not None
        for seat in seating
    ):
        return True

    # MRV Heuristic

    pos = get_mrv_seat(
        seating,
        students,
        used,
        cols
    )

    for i in range(len(students)):

        if not used[i]:

            if is_safe(
                seating,
                students[i],
                pos,
                cols
            ):

                seating[pos] = students[i]
                used[i] = True

                print(
                    f"Assigning Seat {pos + 1} "
                    f"-> {students[i].htno} "
                    f"({students[i].branch})"
                )

                # Forward Checking

                if forward_check(
                    seating,
                    students,
                    used,
                    cols
                ):

                    if backtrack(
                        students,
                        seating,
                        used,
                        pos + 1,
                        cols
                    ):
                        return True

                print(
                    f"Backtracking Seat {pos + 1} "
                    f"from {students[i].htno}"
                )

                seating[pos] = None
                used[i] = False

    return False


# DISPLAY HALL

def display_hall(
    seating,
    rows,
    cols
):

    print("\n" + "=" * 80)
    print("FINAL EXAMINATION HALL VIEW")
    print("=" * 80)

    index = 0

    for r in range(rows):

        for c in range(cols):

            if index < len(seating):

                student = seating[index]

                if student is not None:

                    print(
                        f"| {student.htno[-4:]}-{student.branch:^5}",
                        end=" "
                    )

                else:

                    print(
                        "| EMPTY    ",
                        end=" "
                    )

            index += 1

        print("|")
        print("-" * 80)


# MAIN PROGRAM

print("=" * 70)
print("EXAMINATION SEATING ARRANGEMENT SYSTEM")
print("=" * 70)

rows = int(
    input(
        "\nEnter Number of Rows    : "
    )
)

cols = int(
    input(
        "Enter Number of Columns : "
    )
)

total_seats = rows * cols

print("\nHall Capacity :", total_seats)

students = []

print("\nEnter Student Data")
print("Format : HTNO,NAME,BRANCH")
print("Type DONE when finished\n")

# LISTS + LOOPS + INPUT

while True:

    data = input(">> ")

    if data.upper() == "DONE":
        break

    parts = data.split(",")

    if len(parts) != 3:

        print("Invalid Format")
        continue

    htno = parts[0].strip()
    name = parts[1].strip()
    branch = parts[2].strip().upper()

    students.append(
        Student(
            htno,
            name,
            branch
        )
    )

print("\nStudents Registered :", len(students))

if len(students) > total_seats:

    print(
        "\nERROR : More students than seats"
    )

    exit()

# LISTS


seating = [None] * len(students)

used = [False] * len(students)

print("\nGenerating Seating Arrangement...\n")

result = backtrack(
    students,
    seating,
    used,
    0,
    cols
)

# CONSTRAINT FAILURE ANALYSIS

if result:

    display_hall(
        seating,
        rows,
        cols
    )

    print("\n" + "=" * 60)
    print("CONSTRAINT ANALYSIS REPORT")
    print("=" * 60)

    print(
        "Total Students :",
        len(students)
    )

    print(
        "Seats Filled   :",
        len(students)
    )

    print(
        "Conflicts      : 0"
    )

    print(
        "Status         : VALID ARRANGEMENT"
    )

    print("\nAlgorithms Used")

    print("✓ Backtracking")
    print("✓ Forward Checking")
    print("✓ MRV Heuristic")
    print("✓ Degree Heuristic")

else:

    print("\n" + "=" * 60)
    print("CONSTRAINT FAILURE REPORT")
    print("=" * 60)

    print(
        "Arrangement Failed"
    )

    print(
        "\nReason:"
    )

    print(
        "No valid seating arrangement "
        "satisfies the constraints."
    )

    print(
        "\nPossible Causes:"
    )

    print(
        "1. Too many students "
        "from the same branch"
    )

    print(
        "2. Hall size too small"
    )

    print(
        "3. Branch adjacency "
        "constraint violated"
    )