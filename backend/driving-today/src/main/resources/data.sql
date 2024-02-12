INSERT INTO Academy (name, latitude, longitude, cert)
VALUES
    ('Academy 1', 37.12345, -122.6789, true),
    ('Academy 2', 37.54321, -122.9876, false),
    ('Academy 3', 37.98765, -122.3456, true),
    ('Academy 4', 37.45678, -122.1234, false),
    ('Academy 5', 37.87654, -122.5432, true),
    ('Academy 6', 37.23456, -122.8765, false),
    ('Academy 7', 37.65432, -122.2345, true),
    ('Academy 8', 37.34567, -122.5678, false),
    ('Academy 9', 37.78901, -122.4321, true),
    ('Academy 10', 37.01234, -122.7890, false);


INSERT INTO Student (name, phone_number, student_image, nickname)
VALUES
    ('John Doe', '010-1234-5678', 'http://example.com/image1.jpg', 'Johny'),
    ('Jane Smith', '010-9876-5432', 'http://example.com/image2.jpg', 'Janey'),
    ('David Lee', '010-5678-1234', 'http://example.com/image3.jpg', 'Dave'),
    ('Emma Johnson', '010-4321-8765', 'http://example.com/image4.jpg', 'Emmy'),
    ('Michael Brown', '010-8765-4321', 'http://example.com/image5.jpg', 'Mike'),
    ('Jessica Kim', '010-3456-7890', 'http://example.com/image6.jpg', 'Jess'),
    ('Daniel Park', '010-6543-2109', 'http://example.com/image7.jpg', 'Danny'),
    ('Sophia Lee', '010-2109-8765', 'http://example.com/image8.jpg', 'Sophie'),
    ('Matthew Choi', '010-7890-1234', 'http://example.com/image9.jpg', 'Matt'),
    ('Olivia Jung', '010-8901-3456', 'http://example.com/image10.jpg', 'Liv');


INSERT INTO Instructor (name, phone_number, instructor_image, price_per_hour, introduction, academy_id)
VALUES
    ('Instructor 1', '010-1111-1111', 'instructor_image_1.jpg', 50000, 'Introduction 1', 1),
    ('Instructor 2', '010-2222-2222', 'instructor_image_2.jpg', 55000, 'Introduction 2', 2),
    ('Instructor 3', '010-3333-3333', 'instructor_image_3.jpg', 60000, 'Introduction 3', 3),
    ('Instructor 4', '010-4444-4444', 'instructor_image_4.jpg', 65000, 'Introduction 4', 4),
    ('Instructor 5', '010-5555-5555', 'instructor_image_5.jpg', 70000, 'Introduction 5', 5),
    ('Instructor 6', '010-6666-6666', 'instructor_image_6.jpg', 75000, 'Introduction 6', 6),
    ('Instructor 7', '010-7777-7777', 'instructor_image_7.jpg', 80000, 'Introduction 7', 7),
    ('Instructor 8', '010-8888-8888', 'instructor_image_8.jpg', 85000, 'Introduction 8', 8),
    ('Instructor 9', '010-9999-9999', 'instructor_image_9.jpg', 90000, 'Introduction 9', 9),
    ('Instructor 10', '010-0000-0000', 'instructor_image_10.jpg', 95000, 'Introduction 10', 10);

INSERT INTO RESERVATION(is_accepted, reservation_date, reservation_time, training_time, created_at, instructor_id, student_id)
VALUES
    (1, '2024-02-11', 14, 2, '2024-02-11 15:30:00', 1, 1),
    (1, '2024-02-20', 10, 1, '2024-01-11 20:14:30', 7, 3);