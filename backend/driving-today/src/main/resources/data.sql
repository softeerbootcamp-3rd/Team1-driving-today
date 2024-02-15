INSERT INTO academy (name, latitude, longitude, cert)
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


INSERT INTO student (name, email, password, phone_number, student_image, nickname)
VALUES
    ('John Doe', 'abc@naver.com', '1111', '010-1234-5678', 'http://example.com/image1.jpg', 'Johny'),
    ('Jane Smith', 'def@naver.com', '1111', '010-9876-5432', 'http://example.com/image2.jpg', 'Janey'),
    ('David Lee', 'ghi@naver.com', '1111', '010-5678-1234', 'http://example.com/image3.jpg', 'Dave'),
    ('Emma Johnson', 'jkl@naver.com', '1111', '010-4321-8765', 'http://example.com/image4.jpg', 'Emmy'),
    ('Michael Brown', 'mno@naver.com', '1111', '010-8765-4321', 'http://example.com/image5.jpg', 'Mike'),
    ('Jessica Kim', 'pqr@naver.com', '1111', '010-3456-7890', 'http://example.com/image6.jpg', 'Jess'),
    ('Daniel Park', 'stu@naver.com', '1111', '010-6543-2109', 'http://example.com/image7.jpg', 'Danny'),
    ('Sophia Lee', 'vwx@naver.com', '1111', '010-2109-8765', 'http://example.com/image8.jpg', 'Sophie'),
    ('Matthew Choi', 'yz@naver.com', '1111', '010-7890-1234', 'http://example.com/image9.jpg', 'Matt'),
    ('Olivia Jung', 'oliv@naver.com', '1111', '010-8901-3456', 'http://example.com/image10.jpg', 'Liv');


INSERT INTO instructor (name, email, password, phone_number, instructor_image, price_per_hour, introduction, academy_id)
VALUES
    ('Instructor 1', 'in1@naver.com', '1111', '010-1111-1111', 'instructor_image_1.jpg', 50000, 'Introduction 1', 1),
    ('Instructor 2', 'in2@naver.com', '1111', '010-2222-2222', 'instructor_image_2.jpg', 55000, 'Introduction 2', 2),
    ('Instructor 3', 'in3@naver.com', '1111', '010-3333-3333', 'instructor_image_3.jpg', 60000, 'Introduction 3', 3),
    ('Instructor 4', 'in4@naver.com', '1111', '010-4444-4444', 'instructor_image_4.jpg', 65000, 'Introduction 4', 4),
    ('Instructor 5', 'in5@naver.com', '1111', '010-5555-5555', 'instructor_image_5.jpg', 70000, 'Introduction 5', 5),
    ('Instructor 6', 'in6@naver.com', '1111', '010-6666-6666', 'instructor_image_6.jpg', 75000, 'Introduction 6', 6),
    ('Instructor 7', 'in7@naver.com', '1111', '010-7777-7777', 'instructor_image_7.jpg', 80000, 'Introduction 7', 7),
    ('Instructor 8', 'in8v@naver.com', '1111', '010-8888-8888', 'instructor_image_8.jpg', 85000, 'Introduction 8', 8),
    ('Instructor 9', 'in9@naver.com', '1111', '010-9999-9999', 'instructor_image_9.jpg', 90000, 'Introduction 9', 9),
    ('Instructor 10', 'in10@naver.com', '1111', '010-0000-0000', 'instructor_image_10.jpg', 95000, 'Introduction 10', 10);

INSERT INTO review (contents, rating, created_at, student_id, instructor_id)
VALUES
    ('Great instructor!', 4.5, '2024-02-08 10:00:00', 1, 1),
    ('Excellent teaching skills!', 5.0, '2024-02-08 11:00:00', 2, 1),
    ('Very patient and knowledgeable', 4.5, '2024-02-08 12:00:00', 3, 1),
    ('Could improve communication', 3.5, '2024-02-08 13:00:00', 4, 1),
    ('Highly recommend!', 4.4, '2024-02-08 14:00:00', 5, 1),
    ('Amazing experience!', 5.0, '2024-02-08 15:00:00', 6, 1),
    ('Good instructor overall', 4.0, '2024-02-08 16:00:00', 7, 1),
    ('Very informative lessons', 4.5, '2024-02-08 17:00:00', 8, 1),
    ('Friendly and approachable', 4.0, '2024-02-08 18:00:00', 9, 1),
    ('Could be more punctual', 3.5, '2024-02-08 19:00:00', 10, 1),
    ('Great instructor!', 3.5, '2024-02-08 10:00:00', 1, 8),
    ('Excellent teaching skills!', 2.0, '2024-02-08 11:00:00', 2, 8),
    ('Very patient and knowledgeable', 1.5, '2024-02-08 12:00:00', 3, 8),
    ('Could improve communication', 1.5, '2024-02-08 13:00:00', 4, 8),
    ('Highly recommend!', 2.0, '2024-02-08 14:00:00', 5, 8);

INSERT INTO reservation (is_accepted, reservation_date, reservation_time, training_time, created_at, instructor_id, student_id)
VALUES
    (1, '2024-02-11', 14, 2, '2024-02-11 15:30:00', 1, 1),
    (1, '2024-02-12', 14, 2, '2024-02-11 15:30:00', 1, 1),
    (1, '2024-02-13', 14, 2, '2024-02-11 15:30:00', 1, 1),
    (1, '2024-02-20', 10, 1, '2024-01-11 20:14:30', 7, 3);

