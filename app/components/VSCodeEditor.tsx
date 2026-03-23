import React, { useState } from "react";
import {
  File,
  ChevronDown,
  Star,
  Play,
  CheckCircle,
  Code2,
} from "lucide-react";

interface Exercise {
  name: string;
  description: string;
  instructions: string;
  starterCode: string;
  expectedOutput: string;
  solution: string;
  hints?: string[];
}

interface Tutorial {
  title: string;
  description: string;
  exercises: Exercise[];
  color: string;
}

interface TutorialData {
  [key: string]: Tutorial;
}

interface ExpandedState {
  [key: string]: boolean;
}

interface CompletedExercises {
  [key: string]: boolean;
}

const CodePracticeApp: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("javascript");
  const [tutorials, setTutorials] = useState<TutorialData>({
    basics: {
      title: "Programming Basics",
      description: "Learn the fundamentals of programming",
      color: "#FFD700",
      exercises: [
        {
          name: "Hello World",
          description: "Your first program!",
          instructions: "Write a program that prints 'Hello, World!' to the console.",
          starterCode: "// Write your code here\n",
          expectedOutput: "Hello, World!",
          solution: "console.log('Hello, World!');",
          hints: ["Use console.log() to print text", "Don't forget the quotes around the text!"]
        },
        {
          name: "Variables",
          description: "Store and use data",
          instructions: "Create a variable called 'name' with your name, then print a greeting.",
          starterCode: "// Create a variable and print a greeting\n",
          expectedOutput: "Hello, Ben!",
          solution: "const name = 'Ben';\nconsole.log('Hello, ' + name + '!');",
          hints: ["Use let or const to create variables", "You can combine strings with +"]
        }
      ]
    },
    functions: {
      title: "Functions",
      description: "Learn to create reusable code blocks",
      color: "#FF4B4B",
      exercises: [
        {
          name: "Simple Function",
          description: "Create your first function",
          instructions: "Write a function called 'greet' that takes a name and returns a greeting.",
          starterCode: "// Write a function called greet\n\n// Call your function\ngreet('World');",
          expectedOutput: "Hello, World!",
          solution: "function greet(name) {\n  return 'Hello, ' + name + '!';\n}\n\nconsole.log(greet('World'));",
          hints: ["Functions use the 'function' keyword", "Use 'return' to send back a value"]
        },
        {
          name: "Math Function",
          description: "Functions with calculations",
          instructions: "Create a function 'add' that takes two numbers and returns their sum.",
          starterCode: "// Write a function called add\n\n// Test it\nconsole.log(add(2, 3));",
          expectedOutput: "5",
          solution: "function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(2, 3));",
          hints: ["Use + to add numbers", "Don't forget to return the result"]
        }
      ]
    },
    loops: {
      title: "Loops & Arrays",
      description: "Work with repetition and data collections",
      color: "#6366F1",
      exercises: [
        {
          name: "Count to 5",
          description: "Use a loop to count",
          instructions: "Write a for loop that prints numbers 1 through 5.",
          starterCode: "// Write a for loop\n",
          expectedOutput: "1\n2\n3\n4\n5",
          solution: "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
          hints: ["for loops have 3 parts: start; condition; increment", "Use i++ to count up"]
        },
        {
          name: "Array Fun",
          description: "Work with arrays",
          instructions: "Create an array of colors and print each one using a loop.",
          starterCode: "// Create an array of colors\n// Loop through and print each color\n",
          expectedOutput: "red\ngreen\nblue",
          solution: "const colors = ['red', 'green', 'blue'];\nfor (let i = 0; i < colors.length; i++) {\n  console.log(colors[i]);\n}",
          hints: ["Arrays use square brackets []", "Use .length to get array size"]
        }
      ]
    }
  });

  const [expandedTutorials, setExpandedTutorials] = useState<ExpandedState>({
    basics: true,
    functions: false,
    loops: false,
  });

  const [selectedTutorial, setSelectedTutorial] = useState<string>("basics");
  const [selectedExercise, setSelectedExercise] = useState<Exercise>(
    tutorials.basics.exercises[0]
  );
  const [currentCode, setCurrentCode] = useState<string>(tutorials.basics.exercises[0].starterCode);
  const [completedExercises, setCompletedExercises] = useState<CompletedExercises>({});
  const [showHints, setShowHints] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const checkAnswer = () => {
    const exerciseKey = `${selectedTutorial}-${selectedExercise.name}`;
    const userOutput = simulateCodeExecution(currentCode);
    const isCorrect = userOutput.trim() === selectedExercise.expectedOutput.trim();

    if (isCorrect) {
      setCompletedExercises(prev => ({ ...prev, [exerciseKey]: true }));
    }

    return { isCorrect, userOutput };
  };

  const simulateCodeExecution = (code: string): string => {
    try {
      let output = "";
      const console = {
        log: (...args: any[]) => {
          output += args.join(" ") + "\n";
        }
      };

      const func = new Function("console", code);
      func(console);

      return output.trim();
    } catch (error) {
      return "Error: " + (error as Error).message;
    }
  };

  const selectExercise = (tutorialKey: string, exercise: Exercise) => {
    setSelectedTutorial(tutorialKey);
    setSelectedExercise(exercise);
    setCurrentCode(exercise.starterCode);
    setShowHints(false);
    setShowAnswer(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100/25 dark:bg-gray-900/25 w-full">
      {/* Header with Language Selection */}
      <div className="h-10 border-b border-gray-700 dark:bg-gray-800 bg-gray-100 flex items-center px-4">
        <Code2 size={16} className="mr-2 text-blue-500" />
        <span className="text-sm font-medium mr-4">Code Practice</span>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="text-xs bg-transparent border border-gray-600 rounded px-2 py-1"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML/CSS</option>
        </select>
      </div>

      <div className="flex flex-1 text-xs sm:text-sm">
        {/* Tutorial Sidebar */}
        <div className="w-64 border-r border-gray-700 dark:bg-gray-800 bg-gray-100 text-black dark:text-gray-300">
          <div className="p-2">
            {Object.entries(tutorials).map(([tutorialKey, tutorial]) => (
              <div key={tutorialKey} className="mb-4">
                <div className="flex items-center justify-between p-1">
                  <div
                    className="flex items-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded flex-1"
                    onClick={() =>
                      setExpandedTutorials((prev) => ({
                        ...prev,
                        [tutorialKey]: !prev[tutorialKey],
                      }))
                    }
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${expandedTutorials[tutorialKey] ? "" : "-rotate-90"}`}
                    />
                    <Star
                      size={14}
                      className="mx-2"
                      style={{ color: tutorial.color }}
                    />
                    <span className="font-medium">{tutorial.title}</span>
                  </div>
                </div>

                {expandedTutorials[tutorialKey] && (
                  <>
                    <div className="ml-6 text-xs text-gray-500 mb-2">
                      {tutorial.description}
                    </div>
                    {tutorial.exercises.map((exercise) => {
                      const exerciseKey = `${tutorialKey}-${exercise.name}`;
                      const isCompleted = completedExercises[exerciseKey];
                      const isSelected = selectedExercise === exercise;

                      return (
                        <div
                          key={exercise.name}
                          className={`flex items-center p-2 cursor-pointer rounded hover:bg-gray-300 dark:hover:bg-gray-700 ml-4 ${
                            isSelected ? "dark:bg-gray-700 bg-gray-300" : ""
                          }`}
                          onClick={() => selectExercise(tutorialKey, exercise)}
                        >
                          {isCompleted ? (
                            <CheckCircle size={12} className="mr-2 text-green-500" />
                          ) : (
                            <File size={12} className="mr-2" />
                          )}
                          <div className="flex-1">
                            <div className="font-medium">{exercise.name}</div>
                            <div className="text-xs text-gray-500">{exercise.description}</div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Exercise Instructions */}
          <div className="border-b border-gray-700 dark:bg-gray-800 bg-gray-200 p-4">
            <h2 className="text-lg font-bold text-black dark:text-white mb-2">
              {selectedExercise.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {selectedExercise.instructions}
            </p>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setShowHints(!showHints)}
                className="px-3 py-1 text-xs bg-yellow-500 text-black rounded hover:bg-yellow-400"
              >
                {showHints ? "Hide Hints" : "Show Hints"}
              </button>
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="px-3 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-400"
              >
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </button>
              <button
                onClick={() => {
                  const result = checkAnswer();
                  alert(result.isCorrect ? "Correct! 🎉" : `Not quite. Your output: "${result.userOutput}"`);
                }}
                className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-500"
              >
                <Play size={12} className="inline mr-1" />
                Run Code
              </button>
              <button
                onClick={() => setCurrentCode(selectedExercise.starterCode)}
                className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-500"
              >
                Reset
              </button>
            </div>
            {showHints && selectedExercise.hints && (
              <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 rounded p-3 mb-3">
                <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">Hints:</div>
                <ul className="text-xs text-yellow-700 dark:text-yellow-300 list-disc list-inside">
                  {selectedExercise.hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}
            {showAnswer && (
              <div className="bg-orange-100 dark:bg-orange-900/30 border border-orange-400 rounded p-3">
                <div className="text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">Solution:</div>
                <pre className="text-xs text-orange-700 dark:text-orange-300 font-mono bg-orange-50 dark:bg-orange-900/50 p-2 rounded">
                  {selectedExercise.solution}
                </pre>
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div className="flex flex-1">
            <div className="p-4 text-right dark:text-gray-500 dark:bg-gray-800 text-black bg-gray-300 select-none w-12">
              {currentCode.split("\n").map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <textarea
              value={currentCode}
              onChange={(e) => setCurrentCode(e.target.value)}
              className="p-4 flex-1 bg-inherit dark:bg-inherit dark:text-gray-300 text-black font-mono resize-none outline-none"
              placeholder="Start coding here..."
              spellCheck="false"
              style={{
                minHeight: "100%",
                lineHeight: "1.5",
                tabSize: 2,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePracticeApp;
