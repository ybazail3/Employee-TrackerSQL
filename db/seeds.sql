INSERT INTO department (department_name)
VALUES
('IT'),
('Human Resources'),
('Fraud Department'),

INSERT INTO roles (title, salary, department_id)
VALUES
('Software Developer', 120000, 1),
('Full-Stack Developer', 140000, 1),
('Data Analyst', 11500, 1),
('Senior Payroll', 80000, 2),
('HR Generalist', 75000, 2),
('Financial Crimes Investigator', 50000, 3),
('Compliance Administrator', 60000, 3)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Bugs', 'Bunny', 1, 1),
('Daffey', 'Duck', 1, 1),
('Porky', 'Pig', 1, 1),
('Beaky', 'Buzzard', 2, 2),
('Marvin', 'Martian', 2, 2),
('Petunia', 'Pig', 3, 3),
('Pepe', 'Le Pew', 3, 3)
