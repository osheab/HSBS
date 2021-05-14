"use strict";

// This code will import SQLite library.
const sqlite3 = require("sqlite3").verbose();

// This code instructs the application layer to use planetdoctor classes
const planetdoctor = require("../planetdoctor.js");

// This code will connect to the planetdocotor database.
var db = new sqlite3.Database("data/PlanetDoctor.db", function(err) {
    // this code will run in case of an error
    if (err) {
        return console.error(err.message);
    }
    // This code will run if there is no error
    console.log("You are now Connected to planetdoctor database.");
});

// This will Export getPrescriptions function
exports.getPrescriptions = function(callback) {
    // Creating SQL statement for Prescriptions and connecting foreign keys
    var sql = `SELECT * FROM prescriptions `;

    // This will execute the query and return all prescriptions
    db.all(sql, function(err, rows) {
        // This will check if there is an error within the code
        if (err) {
            return console.error(err.message);
        }
        // Create an array of Prescriptions
        var prescriptions = [];
        // Loop through rows to create Prescriptions objects
        for (var row of rows) {
            // Create Prescriptions object
            var Meds = new planetdoctor.Prescriptions(row.Drug_name, row.Stock, row.Drug_ID, row.Patient_ID);
            // This code will push prescriptions to array created above
            prescriptions.push(Meds);
        }
        // Execute callback function on prescriptions 
        callback(prescriptions);
    });
};

// Export getPrescription function
exports.getPrescription = function(Meds, callback) {
    // Create SQL statement for prescriptions 
    var sql = `
        SELECT * FROM Prescriptions
        WHERE Drug_ID = '${code}'`;
    // Execute query, this will return only one row of data
    db.get(sql, function(err, row) {
        if (err) {
            return console.error(err.message);
        }
        // Create a prescription object
        var prescription = new planetdoctor.Prescriptions(row.Drug_name, row.Stock, row.Drug_ID, row.Patient_ID);
        // Return prescription 
        callback(prescription);
    });
};

exports.addPrescription = function (prescription,callback) {
    var sql = `INSERT INTO Prescriptions VALUES ('${prescription.Drug_name}', '${prescription.Stock}','${prescription.Drug_ID}', '${prescription.Patient_ID}')`; 
    // This code will execute SQL insert statement above
    db.exec(sql, function(err) {
      // After the SQL statement, a callback function will be executed
        callback();
        });
    }; 

//Code here will expose doctor data information

// This code will export getDoctors function 
exports.getDoctors = function(callback) {
    // SQL statement for showing all doctors created
    var sql = `
        SELECT * FROM Doctors`;
    // To execute the SQL query and the return all doctors
    db.all(sql, function(err, rows) {
        // This code will check for any errors and if any run the code
        if (err) {
            return console.error(err.message);
        }
        // Create an array for Doctors
        var doctors = [];
        // This code will Loop through each row  to create Doctor objects
        for (var row of rows) {
            // To create a doctor object
            var doc = new planetdoctor.Doctors(row.Name, row.Doctor_ID, row.Gender, row.Availability);
            // This code will push each doctor to the array created above
            doctors.push(doc);
        }
        // callback function will be executed with this code
        callback(doctors);
    });
};

// This code will export getDoctor function
exports.getDoctor = function(doc, callback) {
    // SQL statement for showing a single doctor created
    var sql = `
        SELECT * FROM Doctors
        WHERE Doctor_ID = '${doc}'`;
    // The code below will execute the query above and return just a row of data.
    db.get(sql, function(err, row) {
        // To check for errors, this code will be excuted and if any the error msg will be displayed
        if (err) {
            return console.error(err.message);
        }
        // This code will create a doctor object
        var doctor = new planetdoctor.Doctors(row.Name, row.Doctor_ID, row.Gender, row.Availability);
        // After the code above is excuted then this code will return a doctor
        callback(doctor);
    });
};

//Adding  a deleteDoctor function
// This code will delete a doctor from the database
exports.deleteDoctor = function(Doctor_ID, callback) {
    // SQL delete statement
    var sql = `DELETE FROM Doctors WHERE Doctor_ID='${Doctor_ID}'`;
    // This code will execute the above SQL delete statement
    db.exec(sql, function(err) {
      // After the SQL statement, a callback function will be executed
        callback();
        });
    };

    // This code will add a doctor to the doctors database as entered from the front end
exports.addDoctor = function(doctor, callback) {
    // This is the SQL insert statement to enter new doctor availability information
    var sql = `INSERT INTO Doctors VALUES ('${doctor.Name}', '${doctor.Doctor_ID}','${doctor.Gender}', '${doctor.Availability}')`;
    // This code will execute SQL insert statement above
    db.exec(sql, function(err) {
      // After the SQL statement, a callback function will be executed
        callback();
        });
    };
    





// Communication with the doctors database stops here

//The following code will broadcast Diagnostics data

// This code will allow to export getDiagnostics function
exports.getDiagnostics = function(callback) {
    // This code will create SQL statement
    var sql = `SELECT * FROM diagnostics` 

 // This code will allow to execute queries and return data from Diagnostics class 
db.all(sql, function(err, rows) {
    // Check if error
    if (err) {
        return console.error(err.message);
    }
    // This code will create diagnostics array
        var diagnostics = [];
        //This code will allow to loop through rows creating diagnostics objects
        for (var row of rows) {
            
            // This code will create Diagnostics object
            var diag = new planetdoctor.Diagnostics(row.Patient_ID, row.P_First_name, row.P_Last_name, row.Diagnosis, row.Drug_ID, row.Drug_name, row.Tests, row.Referal);
            // This code will add Diagnostics object to array
            diagnostics.push(diag);
        }
        // This code will execute callback function
        callback(diagnostics);
    });
};

// This code will export getDiagnostic function
exports.getDiagnostic = function(code, callback) {
    // This code will allow to create SQL statements
   console.log('in data.js code parameter', code)
    var sql = `
        SELECT * FROM Diagnostics
        WHERE Patient_ID = '${code}'`;
    // This code will execute return of only one row from the sql query
    db.get(sql, function(err, row) {
        console.log('row in data.js:', row)
        if (err) {
            return console.error(err.message);
        }
        // This code will create a diagnostic object
        var diagnostic = new planetdoctor.Diagnostics(row.Patient_ID, row.P_First_name, row.P_Last_name, row.Diagnosis, row.Drug_ID, row.Drug_name, row.Tests, row.Referal);
        // This code will return diagnostics
        console.log('data.js, getdiagnostic, callback function diagnostic argument', diagnostic)
        callback(diagnostic);
    });
};

// Delete Diagnostic from the database
exports.deleteDiagnostic = function(Drug_ID, callback) {
// Create SQL delete query
    var sql = `DELETE FROM diagnostics WHERE Patient_ID='${Drug_ID}'`;
    // Execute SQL delete query 
    db.exec(sql, function(err) {
        callback();
    });
};
// Add new diagnostics data to the database
exports.addDiagnostic = function(diagnostic, callback) {
    //Create SQL create query
    var sql = `INSERT INTO diagnostics VALUES ('${diagnostic.Patient_ID}', '${diagnostic.P_First_Name}', '${diagnostic.P_Last_Name}', '${diagnostic.Diagnosis}', '${diagnostic.Drug_ID}', '${diagnostic.Drug_name}', '${diagnostic.Tests}', '${diagnostic.Referal}')`;
    // Execute SQL create query 
    db.exec(sql, function(err) {
        callback();
    });
};

exports.updateDiagnostic = function(Drug_ID, callback) {
    // SQL update statement
    var sql = `UPDATE Diagnostics SET Diagnosis= ${diagnostic.Diagnosis}  WHERE Drug_ID='${diagnostic.Drug_ID}'`;
    // This code will execute the above SQL update statement
    db.exec(sql, function(err) {
      // After the SQL statement, a callback function will be executed
        callback();
        });
    };

// Update diagnostics data to the database
exports.alterDiagnostic = function(Drug_ID, callback) {
    // Create SQL update query
    var sql = `UPDATE diagnostics SET Diagnosis= '${diagnostic.Diagnosis}'  WHERE Drug_ID='${diagnostic,Drug_ID}'`;
    db.exec(sql, function(err) {
        callback();
    });
};

// Diagnostics data broadcasting ends here


//The following code will broadcast Patients data
// This code will Export getPatients function
exports.getPatients = function(callback) {
    // Creating SQL statements for Patients and connecting keys
    var sql =`SELECT * FROM Patients`;
    
    // This code will execute query and return data from Patients class
    db.all(sql, function(err, rows) {
        // Check if there is an error
    if (err) {
        return console.error(err.message);
    }
    // This code will create an array of Patients
        var patients= [];
        // This code will loop through rows creating Patient objects
        for (var row of rows) {
            // This code will create patient object
            var pat = new planetdoctor.Patients(row.Patient_ID, row.P_First_Name, row.P_Last_Name, row.DOB, row.Gender, row.Symptoms);
            // This code will add patients to array
            patients.push(pat);
        }
        // This code will execute callback function
        callback(patients);
    });
};

//This code will export getPatient function
exports.getPatient = function(id, callback) {
    // This code will create SQL statement
    var sql =`
            SELECT * FROM Patients
            WHERE Patient_ID ='${id}'
    `;
    //This code will execute query and only one row
    db.get(sql, function(err, row) {
        if (err) {
            return console.error(err.message);
        }
        //This code will create diagnostic object
        //var diag = new planetdoctor.Diagnostics(row.Diagnosis, row.Drug_name);
         
        //This code will create a patient object
        var patient = new planetdoctor.Patients(row.Patient_ID, row.P_First_Name, row.P_Last_Name, row.DOB, row.Gender, row.Symptoms);
        callback(patient)
    });
};


//Adding  a deletePatient function
// This code will delete a patient from the database
exports.deletePatient = function(Patient_ID, callback) {
    // SQL delete statement
    var sql = `DELETE FROM Patients WHERE Patient_ID='${Patient_ID}'`;
    // This code will execute the above SQL delete statement
    db.exec(sql, function(err) {
      // After the SQL statement, a callback function will be executed
        callback();
        });
    };


// Add a patient to the database
exports.addPatient = function(patient, callback) {
    // Create SQL insert statement
    var sql = `INSERT INTO Patients VALUES ('${patient.Patient_ID}', '${patient.P_First_Name}','${patient.P_Last_Name}','${patient.Gender}','${patient.DOB}','${patient.Symptoms}')`;
    // Execute SQL insert statement
    db.exec(sql, function(err) {
      // Once completed, execute callback function
        callback();
    });
};

    exports.updatePatient = function(patient, callback) {
        var sql = `UPDATE Patients
        SET Symptoms="${patient.Symptoms}"
        WHERE Patient_ID="${patient.Patient_ID}"`;
        // Execute SQL update statement
        db.exec(sql, function(err) {
          // Once completed, execute callback function
        callback();
        });
    };

//Patient data broadcasting ends here

//volunteers code starts here 
// Export getVolunteers function
exports.getVolunteers = function(callback) {
    // Create SQL statement
    var sql = `SELECT * FROM volunteers`;
    // Execute query. Return all
    db.all(sql, function(err, rows) {
    // Check if error
    if (err) {
        return console.error(err.message);
    }
    // Create volunteers array
        var volunteers = [];
        // Loop through rows creating volunteers objects
        for (var row of rows) {
            // Create volunteer object
            var volunt = new planetdoctor.Volunteers(row.ID, row.First_Name, row.Last_Name, row.Profession, row.Nationality, row.camp_loc);
            // Add object to array
            volunteers.push(volunt);
        }
        // Execute callback function
        callback(volunteers);
    });
};

// Export getVolunteer function
exports.getVolunteer = function(code, callback) {
    // Create SQL statement
    var sql = `
        SELECT * FROM volunteers
        WHERE ID = '${code}'`;
    // Execute query. Only one row returned.
    db.get(sql, function(err, row) {
        console.log('row in data.js:', row)
        if (err) {
            return console.error(err.message);
        }
        // Create a volunteer object
        var volunteer = new planetdoctor.Volunteers(row.ID, row.First_Name, row.Last_Name, row.Profession, row.Nationality, row.camp_loc);
        // Return module
        callback(volunteer); 
        });
    };

exports.addVolunteer = function(volunteer , callback)   {
   // create SQL insert statment
    var sql= `INSERT INTO volunteers VALUES ('${volunteer.ID}','${volunteer.First_Name}', '${volunteer.Last_Name}','${volunteer.Profession}', '${volunteer.Nationality}','${volunteer.camp_loc}')`;
   //execute SQL insert statement
    db.exec(sql, function(err){
       //once completed, execute callback function
        callback();
    });
};

// This code will delete a volunteer from db
exports.deleteVolunteer = function(ID, callback) {
    // SQL delete statement
    var sql = `DELETE FROM volunteers WHERE ID='${ID}'`;
    // This code will execute the above SQL delete statement
    db.exec(sql, function(err) {
      // After the SQL statement, a callback function will be executed
        callback();
        });
    };

    // This code will alter a volunteer from db
exports.alterVolunteer = function(volunteer, callback) {
    // SQL update statement
    var sql = `UPDATE volunteers SET camp_loc= '${volunteer.camp_loc}'  WHERE ID='${volunteer.ID}'`;
    // This code will execute the above SQL delete statement
    db.exec(sql, function(err) {
      // After the SQL statement, a callback function will be executed
        callback();
        });
    };

    exports.updateVolunteer = function(volunteer, callback) {
        // SQL update statement
        var sql = `UPDATE volunteers SET First_Name= ${volunteer.First_Name}  WHERE ID='${volunteer.ID}'`;
        // This code will execute the above SQL update statement
        db.exec(sql, function(err) {
          // After the SQL statement, a callback function will be executed
            callback();
            });
        };


