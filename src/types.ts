export type Language = 
  | "python"
  | "java"
  | "c"
  | "javascript"
  | "typescript"
  | "cpp"
  | "csharp"
  | "go"
  | "rust"
  | "ruby"
  | "php"
  | "swift"
  | "kotlin"
  | "scala"
  | "r";

export interface CodeTemplate {
  name: string;
  description: string;
  code: string;
  language: Language;
}

export const CODE_TEMPLATES: CodeTemplate[] = [
  // Python templates
  {
    name: "Basic Class",
    description: "A basic Python class with constructor and methods",
    language: "python",
    code: `class MyClass:
    def __init__(self, name):
        self.name = name
    
    def greet(self):
        return f"Hello, {self.name}!"
    
    def __str__(self):
        return f"MyClass(name='{self.name}')`
  },
  {
    name: "FastAPI Endpoint",
    description: "A basic FastAPI endpoint with request handling",
    language: "python",
    code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    description: str | None = None

@app.post("/items/")
async def create_item(item: Item):
    return item`
  },
  // JavaScript templates
  {
    name: "React Component",
    description: "A functional React component with hooks",
    language: "javascript",
    code: `import React, { useState, useEffect } from 'react';

const MyComponent = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    // Effect logic here
    console.log('Component mounted');
  }, []);
  
  return (
    <div>
      <h1>{value}</h1>
      <button onClick={() => setValue(value + 1)}>
        Increment
      </button>
    </div>
  );
};

export default MyComponent;`
  },
  // TypeScript templates
  {
    name: "TypeScript Interface",
    description: "A TypeScript interface with methods",
    language: "typescript",
    code: `interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  
  updateProfile(data: Partial<User>): Promise<void>;
  delete(): Promise<void>;
}

class UserImpl implements User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public role: 'admin' | 'user'
  ) {}
  
  async updateProfile(data: Partial<User>): Promise<void> {
    // Implementation
  }
  
  async delete(): Promise<void> {
    // Implementation
  }
}`
  },
  // Java templates
  {
    name: "Spring Boot Controller",
    description: "A Spring Boot REST controller",
    language: "java",
    code: `@RestController
@RequestMapping("/api")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAll();
    }
    
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.save(user));
    }
}`
  },
  // C++ templates
  {
    name: "Modern C++ Class",
    description: "A modern C++ class using smart pointers",
    language: "cpp",
    code: `#include <memory>
#include <string>

class Person {
private:
    std::string name;
    std::unique_ptr<int> age;
    
public:
    Person(const std::string& n, int a)
        : name(n), age(std::make_unique<int>(a)) {}
    
    const std::string& getName() const { return name; }
    int getAge() const { return *age; }
    
    void setAge(int a) { *age = a; }
};`
  },
  // C# templates
  {
    name: "ASP.NET Core API",
    description: "An ASP.NET Core API controller",
    language: "csharp",
    code: `using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    
    public UsersController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        var users = await _userService.GetAllAsync();
        return Ok(users);
    }
    
    [HttpPost]
    public async Task<ActionResult<User>> CreateUser(User user)
    {
        var createdUser = await _userService.CreateAsync(user);
        return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, createdUser);
    }
}`
  },
  // Go templates
  {
    name: "HTTP Handler",
    description: "A Go HTTP handler with middleware",
    language: "go",
    code: `package main

import (
    "net/http"
    "log"
)

type Handler struct {
    service *Service
}

func NewHandler(service *Service) *Handler {
    return &Handler{service: service}
}

func (h *Handler) HandleRequest(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }
    
    // Handle request
    response, err := h.service.Process(r.Context(), r.Body)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    w.Header().Set("Content-Type", "application/json")
    w.Write(response)
}`
  },
  // Rust templates
  {
    name: "Rust Struct",
    description: "A Rust struct with implementations",
    language: "rust",
    code: `#[derive(Debug)]
struct User {
    name: String,
    age: u32,
    email: Option<String>,
}

impl User {
    fn new(name: String, age: u32) -> Self {
        User {
            name,
            age,
            email: None,
        }
    }
    
    fn set_email(&mut self, email: String) {
        self.email = Some(email);
    }
    
    fn get_email(&self) -> Option<&String> {
        self.email.as_ref()
    }
}`
  },
  // Ruby templates
  {
    name: "Rails Model",
    description: "A Ruby on Rails model with validations",
    language: "ruby",
    code: `class User < ApplicationRecord
  has_many :posts
  has_one :profile
  
  validates :email, presence: true, 
            format: { with: URI::MailTo::EMAIL_REGEXP },
            uniqueness: true
  
  validates :username, presence: true,
            length: { minimum: 3, maximum: 30 },
            uniqueness: true
  
  before_save :normalize_email
  
  private
  
  def normalize_email
    self.email = email.downcase.strip
  end
end`
  },
  // PHP templates
  {
    name: "Laravel Controller",
    description: "A Laravel controller with resource methods",
    language: "php",
    code: `<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);
        
        return User::create($validated);
    }
    
    public function show(User $user)
    {
        return $user;
    }
}`
  },
  // Swift templates
  {
    name: "SwiftUI View",
    description: "A SwiftUI view with state management",
    language: "swift",
    code: `import SwiftUI

struct ContentView: View {
    @State private var count = 0
    @State private var name = ""
    
    var body: some View {
        VStack {
            Text("Count: \(count)")
                .font(.title)
            
            Button("Increment") {
                count += 1
            }
            
            TextField("Enter name", text: $name)
                .textFieldStyle(RoundedBorderTextFieldStyle())
            
            Text("Hello, \(name)")
                .font(.headline)
        }
        .padding()
    }
}`
  },
  // Kotlin templates
  {
    name: "Kotlin Data Class",
    description: "A Kotlin data class with companion object",
    language: "kotlin",
    code: `data class User(
    val id: Long,
    val name: String,
    val email: String,
    val role: UserRole
) {
    companion object {
        fun create(name: String, email: String): User {
            return User(
                id = System.currentTimeMillis(),
                name = name,
                email = email,
                role = UserRole.USER
            )
        }
    }
}

enum class UserRole {
    ADMIN, USER
}`
  },
  // Scala templates
  {
    name: "Scala Case Class",
    description: "A Scala case class with companion object",
    language: "scala",
    code: `case class User(
  id: Long,
  name: String,
  email: String,
  role: UserRole
)

object User {
  def apply(name: String, email: String): User = {
    User(
      id = System.currentTimeMillis(),
      name = name,
      email = email,
      role = UserRole.User
    )
  }
}

sealed trait UserRole
object UserRole {
  case object Admin extends UserRole
  case object User extends UserRole
}`
  },
  // R templates
  {
    name: "Data Analysis",
    description: "An R script for data analysis using tidyverse",
    language: "r",
    code: `library(tidyverse)

# Read data
data <- read_csv("data.csv")

# Data processing
processed_data <- data %>%
  filter(!is.na(value)) %>%
  group_by(category) %>%
  summarise(
    mean = mean(value),
    sd = sd(value),
    n = n()
  ) %>%
  arrange(desc(mean))

# Visualization
ggplot(processed_data, aes(x = category, y = mean)) +
  geom_bar(stat = "identity") +
  geom_errorbar(aes(ymin = mean - sd, ymax = mean + sd), width = 0.2) +
  theme_minimal() +
  labs(title = "Mean Values by Category",
       x = "Category",
       y = "Mean Value")`
  },
  // C templates
  {
    name: "C Struct",
    description: "A C struct with functions",
    language: "c",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[50];
    int age;
    float salary;
} Employee;

Employee* create_employee(const char* name, int age, float salary) {
    Employee* emp = (Employee*)malloc(sizeof(Employee));
    if (emp == NULL) {
        return NULL;
    }
    
    strncpy(emp->name, name, sizeof(emp->name) - 1);
    emp->name[sizeof(emp->name) - 1] = '\\0';
    emp->age = age;
    emp->salary = salary;
    
    return emp;
}

void print_employee(const Employee* emp) {
    printf("Name: %s\\n", emp->name);
    printf("Age: %d\\n", emp->age);
    printf("Salary: %.2f\\n", emp->salary);
}

void free_employee(Employee* emp) {
    free(emp);
}`
  }
]; 