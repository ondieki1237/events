-- Insert departments
INSERT INTO departments (name, description, icon) VALUES
('Laboratory Equipment', 'Advanced diagnostic and testing equipment', '🔬'),
('Surgical Instruments', 'Precision surgical tools and equipment', '🏥'),
('Imaging Systems', 'Modern imaging and diagnostic technology', '📊'),
('Dental Equipment', 'Complete dental care solutions', '🦷'),
('Patient Monitoring', 'Real-time patient monitoring systems', '❤️'),
('Sterilization', 'Sterilization and infection control', '✨');

-- Insert products for Laboratory Equipment (dept_id = 1)
INSERT INTO products (department_id, name, description) VALUES
(1, 'Automated Analyzer', 'High-throughput automated analysis system'),
(1, 'Centrifuge System', 'Precision centrifugation for sample preparation'),
(1, 'Microscope Station', 'Advanced digital microscopy solution'),
(1, 'Sample Processor', 'Automated sample handling and processing');

-- Insert products for Surgical Instruments (dept_id = 2)
INSERT INTO products (department_id, name, description) VALUES
(2, 'Surgical Kit Set', 'Complete sterile surgical instrument set'),
(2, 'Electrosurgical Unit', 'Advanced electrosurgical cutting and coagulation'),
(2, 'Surgical Lights', 'High-intensity LED surgical lighting'),
(2, 'Instrument Sterilizer', 'Rapid steam sterilization system');

-- Insert products for Imaging Systems (dept_id = 3)
INSERT INTO products (department_id, name, description) VALUES
(3, 'Digital X-Ray', 'High-resolution digital radiography system'),
(3, 'Ultrasound Machine', 'Portable ultrasound imaging system'),
(3, 'CT Scanner', 'Advanced computed tomography imaging'),
(3, 'PACS System', 'Picture archiving and communication system');

-- Insert products for Dental Equipment (dept_id = 4)
INSERT INTO products (department_id, name, description) VALUES
(4, 'Dental Chair', 'Ergonomic patient dental chair'),
(4, 'Intraoral Camera', 'High-definition intraoral imaging'),
(4, 'Dental Compressor', 'Oil-free dental air compressor'),
(4, 'Suction System', 'Powerful dental suction unit');

-- Insert products for Patient Monitoring (dept_id = 5)
INSERT INTO products (department_id, name, description) VALUES
(5, 'Vital Signs Monitor', 'Multi-parameter patient monitor'),
(5, 'ECG Machine', '12-lead electrocardiograph system'),
(5, 'Pulse Oximeter', 'Non-invasive oxygen saturation monitor'),
(5, 'Blood Pressure Monitor', 'Automated blood pressure measurement');

-- Insert products for Sterilization (dept_id = 6)
INSERT INTO products (department_id, name, description) VALUES
(6, 'Autoclave Sterilizer', 'High-pressure steam sterilization'),
(6, 'Dry Heat Sterilizer', 'Dry heat sterilization system'),
(6, 'Disinfection Cabinet', 'UV disinfection cabinet'),
(6, 'Waste Management', 'Medical waste disposal system');
