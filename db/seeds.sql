use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Lorena', 'Morales', 1, NULL),
    ('Jackie', 'Chan', 2, 1),
    ('James', 'Charles', 3, NULL),
    ('Kevin', 'Rivas', 4, 3),
    ('Carrie', 'Holton', 5, NULL),
    ('Alejandra', 'Rivas', 6, 5),
    ('Angel', 'Lara', 7, NULL),
    ('Tom', 'Holland', 8, 7);
