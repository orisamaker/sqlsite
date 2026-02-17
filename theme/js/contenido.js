// Contenido del curso gratuito de SQL (quizzes por módulo)
// Los quizzes están adaptados al contenido de cada artículo del curso.

const modules = {
    intro: {
        title: "Introducción",
        content: `
            <div class="space-y-4">
                <p class="text-slate-600">SQL (Structured Query Language) es el lenguaje estándar para gestionar bases de datos relacionales.</p>
                <ul class="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Qué es SQL y para qué sirve</li>
                    <li>Bases de datos relacionales y RDMS</li>
                    <li>Importancia de SQL en el mercado</li>
                </ul>
                <div class="mt-6">
                    <button onclick="showQuiz('intro')" class="bg-[#0c77f2] text-white px-4 py-2 rounded-md hover:bg-[#0a63cb] transition-colors duration-200 flex items-center gap-2">
                        <span class="material-icons">quiz</span>
                        Hacer quiz
                    </button>
                </div>
            </div>
        `,
        quiz: [
            { question: "¿Qué significan las siglas SQL?", options: ["Structured Query Language", "Simple Question Language", "System Query Logic", "Standard Query Language"], correct: 0 },
            { question: "¿Qué es un RDMS?", options: ["Relational Database Management System", "Random Data Memory Storage", "Remote Database Module Service", "Relational Data Model Schema"], correct: 0 },
            { question: "SQL está ligado al concepto de:", options: ["Base de datos relacional", "Hoja de cálculo", "Archivo de texto", "Cache en memoria"], correct: 0 }
        ]
    },
    querying: {
        title: "Consultas (SELECT)",
        content: `
            <div class="space-y-4">
                <p class="text-slate-600">SELECT se usa para leer datos de una base de datos.</p>
                <ul class="list-disc pl-5 space-y-2 text-slate-600">
                    <li>SELECT * para todas las columnas</li>
                    <li>FROM para indicar la tabla</li>
                    <li>Alias con AS para columnas y tablas</li>
                </ul>
                <div class="mt-6">
                    <button onclick="showQuiz('querying')" class="bg-[#0c77f2] text-white px-4 py-2 rounded-md hover:bg-[#0a63cb] transition-colors duration-200 flex items-center gap-2">
                        <span class="material-icons">quiz</span>
                        Hacer quiz
                    </button>
                </div>
            </div>
        `,
        quiz: [
            { question: "¿Qué símbolo se usa en SELECT para traer todas las columnas de la tabla?", options: ["*", "?", "ALL", "%"], correct: 0 },
            { question: "¿Para qué sirve la cláusula FROM en una consulta?", options: ["Para filtrar filas", "Para indicar de qué tabla leer datos", "Para ordenar resultados", "Para agrupar"], correct: 1 },
            { question: "¿Con qué palabra clave indicamos un alias de columna o tabla?", options: ["AS", "ALIAS", "AS AS", "RENAME"], correct: 0 }
        ]
    },
    filtering: {
        title: "Filtros (WHERE)",
        content: `
            <div class="space-y-4">
                <p class="text-slate-600">La cláusula WHERE filtra las filas que devuelve la consulta.</p>
                <ul class="list-disc pl-5 space-y-2 text-slate-600">
                    <li>=, &lt;, &gt;, &lt;=, &gt;=, &lt;&gt;</li>
                    <li>AND y OR para combinar condiciones</li>
                    <li>IN para varios valores</li>
                </ul>
                <div class="mt-6">
                    <button onclick="showQuiz('filtering')" class="bg-[#0c77f2] text-white px-4 py-2 rounded-md hover:bg-[#0a63cb] transition-colors duration-200 flex items-center gap-2">
                        <span class="material-icons">quiz</span>
                        Hacer quiz
                    </button>
                </div>
            </div>
        `,
        quiz: [
            { question: "¿Qué cláusula se usa para filtrar filas en una consulta?", options: ["FILTER", "WHERE", "HAVING", "IF"], correct: 1 },
            { question: "¿Qué operador significa 'distinto' en SQL?", options: ["!=", "<>", "Ambos <> e !=", "DISTINCT"], correct: 2 },
            { question: "Para que se cumplan dos condiciones a la vez usamos:", options: ["OR", "AND", "IN", "BETWEEN"], correct: 1 },
            { question: "¿Cuál sirve para filtrar por varios valores posibles de un campo?", options: ["BETWEEN", "LIKE", "IN", "AND"], correct: 2 }
        ]
    },
    ordering: {
        title: "Ordenación (ORDER BY)",
        content: `
            <div class="space-y-4">
                <p class="text-slate-600">ORDER BY ordena el resultado de la consulta.</p>
                <ul class="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Ascendente (ASC) o descendente (DESC)</li>
                    <li>Por defecto el orden es ascendente</li>
                    <li>Varios campos separados por coma</li>
                </ul>
                <div class="mt-6">
                    <button onclick="showQuiz('ordering')" class="bg-[#0c77f2] text-white px-4 py-2 rounded-md hover:bg-[#0a63cb] transition-colors duration-200 flex items-center gap-2">
                        <span class="material-icons">quiz</span>
                        Hacer quiz
                    </button>
                </div>
            </div>
        `,
        quiz: [
            { question: "¿Qué cláusula se usa para ordenar los resultados de una consulta?", options: ["SORT BY", "ORDER BY", "ASCEND", "SORT"], correct: 1 },
            { question: "¿Qué palabra clave indica orden descendente (de mayor a menor o Z a A)?", options: ["ASC", "DESC", "DOWN", "MINUS"], correct: 1 },
            { question: "Por defecto, si no indicamos ASC ni DESC, el orden es:", options: ["Descendente", "Ascendente", "Aleatorio", "Por clave primaria"], correct: 1 }
        ]
    },
    joins: {
        title: "Unión de tablas (JOIN)",
        content: `
            <div class="space-y-4">
                <p class="text-slate-600">JOIN combina filas de dos o más tablas según una condición.</p>
                <ul class="list-disc pl-5 space-y-2 text-slate-600">
                    <li>INNER JOIN: solo filas que coinciden</li>
                    <li>LEFT JOIN: todas de la tabla izquierda</li>
                    <li>RIGHT JOIN y FULL OUTER JOIN</li>
                    <li>ON indica los campos por los que se relacionan</li>
                </ul>
                <div class="mt-6">
                    <button onclick="showQuiz('joins')" class="bg-[#0c77f2] text-white px-4 py-2 rounded-md hover:bg-[#0a63cb] transition-colors duration-200 flex items-center gap-2">
                        <span class="material-icons">quiz</span>
                        Hacer quiz
                    </button>
                </div>
            </div>
        `,
        quiz: [
            { question: "¿Qué tipo de JOIN devuelve solo las filas que coinciden en ambas tablas?", options: ["LEFT JOIN", "INNER JOIN", "FULL OUTER JOIN", "OUTER JOIN"], correct: 1 },
            { question: "¿Con qué cláusula indicamos los campos por los que se relacionan dos tablas en un JOIN?", options: ["WHERE", "ON", "MATCH", "LINK"], correct: 1 },
            { question: "¿Qué JOIN incluye todos los registros de la tabla izquierda aunque no haya coincidencia?", options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "FULL JOIN"], correct: 2 }
        ]
    },
    aggregating: {
        title: "Agregación (GROUP BY)",
        content: `
            <div class="space-y-4">
                <p class="text-slate-600">GROUP BY y funciones de agregación (COUNT, SUM, AVG, MAX, MIN) resumen datos.</p>
                <ul class="list-disc pl-5 space-y-2 text-slate-600">
                    <li>COUNT, SUM, AVG, MAX, MIN</li>
                    <li>GROUP BY para agrupar por campo(s)</li>
                    <li>HAVING para filtrar por resultado de agregación</li>
                </ul>
                <div class="mt-6">
                    <button onclick="showQuiz('aggregating')" class="bg-[#0c77f2] text-white px-4 py-2 rounded-md hover:bg-[#0a63cb] transition-colors duration-200 flex items-center gap-2">
                        <span class="material-icons">quiz</span>
                        Hacer quiz
                    </button>
                </div>
            </div>
        `,
        quiz: [
            { question: "¿Qué función devuelve el número de filas?", options: ["SUM()", "COUNT()", "TOTAL()", "NUM()"], correct: 1 },
            { question: "¿Qué función calcula la media de los valores de una columna?", options: ["SUM()", "AVG()", "MEDIAN()", "MEAN()"], correct: 1 },
            { question: "¿Qué cláusula se usa para filtrar resultados en función de una agregación (ej. COUNT > 10)?", options: ["WHERE", "HAVING", "FILTER", "GROUP WHERE"], correct: 1 },
            { question: "Los campos que aparecen en SELECT con funciones de agregación deben estar también en:", options: ["WHERE", "ORDER BY", "GROUP BY", "HAVING"], correct: 2 }
        ]
    }
};
