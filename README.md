# Examination Seating Arrangement System

## Project Overview

The Examination Seating Arrangement System is a console-based Python application that automatically generates seating arrangements for students in an examination hall using Constraint Satisfaction Problem (CSP) techniques.

The system ensures that students belonging to the same branch are not seated adjacent to each other. It uses Artificial Intelligence search techniques such as Backtracking, Forward Checking, Minimum Remaining Values (MRV), and Degree Heuristic to generate a valid seating arrangement.

This project is developed using only Python and demonstrates several concepts from the Design and Analysis of Intelligent Systems syllabus.

---

## Objectives

- Automate examination seating allocation.
- Avoid seating students from the same branch next to each other.
- Demonstrate CSP-based problem solving.
- Implement search algorithms and heuristics.
- Provide constraint failure analysis when arrangement generation is not possible.

---

## Features

- Student registration through user input.
- Exam hall configuration using rows and columns.
- Automatic seating arrangement generation.
- Branch conflict avoidance.
- Constraint validation.
- Failure analysis report.
- Console-based hall visualization.

---

## Technologies Used

- Python 3
- Object Oriented Programming
- Recursion
- Constraint Satisfaction Problem (CSP)

No external libraries are required.

---

## Syllabus Topics Implemented

| Topic | Implementation |
|---------|--------------|
| Python Classes | Student Class |
| Functions | Modular Design |
| Lists | Student and Seating Lists |
| Loops | Input and Search Traversal |
| Conditionals | Constraint Checking |
| Recursion | Backtracking Algorithm |
| Backtracking | Seat Assignment |
| Forward Checking | Future Seat Validation |
| MRV Heuristic | Seat Selection Strategy |
| Degree Heuristic | Tie Breaking Strategy |
| Constraint Failure Analysis | Failure Report |

---

## Problem Formulation

### Problem

Arrange students in an examination hall while satisfying seating constraints.

### Variables

Seats in the examination hall.

### Domain

Registered students.

### Constraints

1. Same branch students cannot sit adjacent horizontally.
2. Same branch students cannot sit adjacent vertically.
3. One seat can contain only one student.
4. One student can be assigned only once.

---

## Algorithms Used

### 1. Backtracking

The algorithm assigns a student to a seat and recursively attempts to assign the remaining students.

If a constraint violation occurs, it backtracks and tries another assignment.

### 2. Forward Checking

Before proceeding to the next seat assignment, the algorithm checks whether future seats still have valid options available.

This reduces unnecessary search.

### 3. MRV Heuristic (Minimum Remaining Values)

Selects the seat with the fewest valid student choices.

This helps reduce the search space.

### 4. Degree Heuristic

When two seats have the same MRV score, the seat affecting the largest number of neighboring seats is selected first.

---

## Program Flow

1. Create Examination Hall
2. Register Students
3. Apply Constraints
4. Select Seat using MRV
5. Apply Degree Heuristic
6. Assign Student
7. Perform Forward Checking
8. Continue Search
9. Backtrack if Required
10. Generate Seating Arrangement
11. Display Constraint Analysis Report

---

## Input Format

### Hall Configuration

Rows : 3

Columns : 4

### Student Data

Format:

HTNO,NAME,BRANCH

Example:

101,Ram,CSE

102,Sai,ECE

103,Kiran,CSIT

104,Ravi,AIDS

DONE

---

## Sample Input

Enter Number of Rows : 3

Enter Number of Columns : 4

101,Ram,CSE

102,Sai,ECE

103,Kiran,CSIT

104,Ravi,AIDS

105,Ajay,CSE

106,Manoj,ECE

DONE

---

## Sample Output

FINAL EXAMINATION HALL VIEW

| 0101-CSE | 0102-ECE | 0103-CSIT | 0104-AIDS |

| 0105-CSE | 0106-ECE | EMPTY | EMPTY |

CONSTRAINT ANALYSIS REPORT

Total Students : 6

Seats Filled : 6

Conflicts : 0

Status : VALID ARRANGEMENT

Algorithms Used

✓ Backtracking

✓ Forward Checking

✓ MRV Heuristic

✓ Degree Heuristic

---

## Constraint Failure Analysis

If a valid arrangement cannot be generated, the system displays a failure report.

Possible Reasons:

- Too many students from the same branch.
- Hall size is insufficient.
- Branch adjacency constraints cannot be satisfied.

---

## Advantages

- Reduces manual seating effort.
- Generates conflict-free arrangements.
- Demonstrates AI search techniques.
- Easy to use and understand.
- Suitable for academic project demonstrations.

---

## Future Enhancements

- Seat numbering.
- Multiple examination halls.
- CSV file input.
- Student branch statistics.
- Exam subject-based seating.
- PDF report generation.

---

## Conclusion

The Examination Seating Arrangement System successfully demonstrates the application of Constraint Satisfaction Problem techniques using Python. By integrating Backtracking, Forward Checking, MRV, and Degree Heuristics, the system efficiently generates valid seating arrangements while satisfying all specified constraints.
