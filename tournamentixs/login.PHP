<?php
// Database connection
$host = "127.0.0.1";
$user = "root";
$password = ""; // Replace with your MySQL password
$database = "tournamentix";

$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle Signup
if (isset($_POST['signup'])) {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Validate password strength: must contain both letters and numbers
    if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/', $password)) {
        echo "<script>alert('Password must be at least 8 characters long and include both letters and numbers!');</script>";
    } else {
        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);

        $sql = "INSERT INTO signup (Username, Email, Password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $username, $email, $hashed_password);

        if ($stmt->execute()) {
            echo "<script>alert('Signup successful! Please login.');</script>";
        } else {
            echo "<script>alert('Error: " . $stmt->error . "');</script>";
        }
        $stmt->close();
    }
}

// Handle Login
if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT Password FROM signup WHERE Username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        // Verify the hashed password
        if (password_verify($password, $hashed_password)) {
            header("Location: index.html");
            exit();
        } else {
            echo "<script>alert('Invalid password!');</script>";
        }
    } else {
        echo "<script>alert('No user found with that username!');</script>";
    }
    $stmt->close();
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login & Signup</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #6a11cb, #2575fc);
        }
        .container {
            width: 400px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        }
        .header {
            background: #2575fc;
            color: #fff;
            text-align: center;
            padding: 20px;
        }
        .form-container {
            padding: 20px;
        }
        .form-container form {
            display: none;
        }
        .form-container form.active {
            display: block;
        }
        input[type="text"], input[type="email"], input[type="password"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        button {
            width: 100%;
            padding: 10px;
            background: #2575fc;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background: #1a5bbb;
        }
        .toggle {
            text-align: center;
            margin-top: 10px;
        }
        .toggle a {
            color: #2575fc;
            text-decoration: none;
        }
        .toggle a:hover {
            text-decoration: underline;
        }
    </style>
    <script>
        function toggleForm(formType) {
            document.getElementById('loginForm').classList.remove('active');
            document.getElementById('signupForm').classList.remove('active');
            document.getElementById(formType).classList.add('active');
        }

        function validatePassword() {
            const password = document.getElementById('signupPassword').value;
            const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

            if (!regex.test(password)) {
                alert('Password must be at least 6 characters long and contain both letters and numbers.');
                return false;
            }
            return true;
        }
    </script>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome</h1>
        </div>
        <div class="form-container">
            <!-- Login Form -->
            <form id="loginForm" class="active" method="POST">
                <h2>Login</h2>
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit" name="login">Login</button>
                <div class="toggle">
                    Don't have an account? <a href="javascript:void(0);" onclick="toggleForm('signupForm')">Signup</a>
                </div>
            </form>
            <!-- Signup Form -->
            <form id="signupForm" method="POST" onsubmit="return validatePassword()">
                <h2>Signup</h2>
                <input type="text" name="username" placeholder="Username" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" id="signupPassword" placeholder="Password" required>
                <button type="submit" name="signup">Signup</button>
                <div class="toggle">
                    Already have an account? <a href="javascript:void(0);" onclick="toggleForm('loginForm')">Login</a>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
