This is a web application to show the solution of the puzzle "Water Jud Challenge"

React was used as a framework along with the javascript language. Pure CSS was used for its development.

To run the program, follow these steps:

Download the repository or clone it with the "git clone" command.

In the project directory, from the console, run "npm install" to download the node modules required for execution.

Run "npm start" which will start the application in development mode.

Open http://localhost:3000 to view it in your browser.

NOTE: If port 3000 is busy, check the console to confirm which port it was served on.

---

Español:

El algoritmo diseñado estudia 3 casos para la resolución del problema:

Suponemos que:

Para efectos de esta solución usaremos x < y, de ser opuesto el programa invierte los valores.
Segun lo dispuesto, z no es mayor que y, asi que ignoramos ese caso. De ocurrir el algoritmo devuelve null.

Caso 1: x = z ; y = z

Es el caso base donde z es igual a x o a y y cuya respuesta es simplemente, llenar x o llenar y según sea el caso.

Caso 2: z < x

Este caso se divide en dos casos:

Caso 2.1: Donde la solución es llenar y luego transferir de y a x sucesivamente hasta que en y quede la cantidad z requerida. Nos damos cuenta que esto es factible ya que el resto de la división (y/x) es igual a z.

Caso 2.2: Donde la solución la buscamos por fuerza bruta, verificando cada posible combinación para obtener el resultado.

NOTA: Los casos de fuerza bruta aplican solo si el resto de (y/x) no es igual a cero. Dado que esto no nos daría nuevos números.

El caso de fuerza bruta se divide en 2:

Caso de fuerza bruta subiendo: Comenzamos llenando x y transfiriendo x a y hasta llegar al máximo y tengamos que vaciar y, donde al vaciar transferimos el restante de x a y y obtenemos un nuevo recorrido subiendo pero con nuevos valores, alguno una posible solución.

Caso de fuerza bruta bajando: Comenzamos llenando y y transfiriendo de y a x hasta llegar y a cero, donde x quedara parcialmente llena, al volver a llenar y y transferir de y a x obtenemos un nuevo recorrido bajando pero con nuevos valores, representando posibles soluciones.

Si en estos casos no existe una solución retorna null.

NOTA: Estos casos requieren una condición para evitar un bucle infinito en el que prueba los mismos valores sin solución. Esta condición es para el caso de fuerza bruta de bajada (y
– (nuevo valor + x) = 0), allí deja de buscar porque encontró todas las posibilidades disponibles. Para el caso de fuerza bruta de subida es (x – ((y – nuevo valor) % x) = x), igualmente alli dejara de buscar.

¿Porque estas formulas?

Ellas indican cuando al realizar las operaciones subiendo o bajando los contenedores vuelven a su estado original, por ende repetirán el proceso.

Caso 3: z < y

Al igual que el primero este se divide en 4 casos, dos de los cuales derivan de uno.

Caso 3.1: donde podemos conseguir la solución subiendo, osea llenando x y transfiriendo de x a y hasta conseguir el valor de z, esto lo podemos verificar esto si dividimos z entre x y su resto es igual a 0, osea estamos en presencia de una división exacta, lo que nos valida el camino como optimo.

Caso 3.2: Donde podemos conseguir la solución bajando, osea llenando y luego transfiriendo de y a x, hasta conseguir el valor de z, podemos verificar esto si primero restamos y menos z y luego entre x, si el resto es 0 concluimos que el camino es optimo.

Caso 3.3: Este caso es la comparacion de los 2 caminos, ambos pueden tener una ruta optima subiendo, y una ruta optima bajando, pero una de las dos es mas corta (si son iguales se hara el camino subiendo).

Caso 3.4: Casos de fuerza bruta subiendo y bajando hasta conseguir el camino mas optimo.

NOTA: Al igual que en el caso 2.2 tenemos las mismas condiciones para detener el algoritmo de un bucle infinito.

Si en estos casos no existe una solución retorna null.

---

English:

The designed algorithm studies 3 cases to solve the problem:

We assume that:

For the purposes of this solution we will use x < y, if it is opposite the program inverts the values.
According to the provisions, z is not greater than y, so we ignore that case. If it occurs the algorithm returns null.

Case 1: x = z ; y = z

It is the base case where z is equal to x or y and whose answer is simply, fill x or fill y as the case may be.

Case 2: z < x

This case is divided into two cases:

Case 2.1: Where the solution is to fill and then transfer from y to x successively until y has the required amount z. We realize that this is feasible since the remainder of the division (y/x) is equal to z.

Case 2.2: Where we search for the solution by brute force, checking each possible combination to obtain the result.

English:NOTE: Brute force cases apply only if the remainder of (y/x) is not equal to zero. Since this would not give us new numbers.

The brute force case is divided into 2:

Brute force case going up: We start by filling x and transferring x to y until we reach the maximum and we have to empty y, where when emptying we transfer the remainder of x to y and we obtain a new route going up but with new values, some a possible solution.

Brute force case going down: We start by filling y and transferring from y to x until we reach y to zero, where x will be partially filled, when filling y again and transferring from y to x we ​​obtain a new route going down but with new values, representing possible solutions.

If in these cases there is no solution, null is returned.

NOTE: These cases require a condition to avoid an infinite loop in which it tries the same values ​​without a solution. This condition is for the brute force case of descent (y – (new value + x) = 0), there it stops searching because it found all the available possibilities. For the brute force case of ascent it is (x – ((y – new value) % x) = x), there it will also stop searching.

Why these formulas?

They indicate when performing the operations by going up or down the containers return to their original state, therefore they will repeat the process.

Case 3: z < y

Like the first one, this one is divided into 4 cases, two of which derive from one.

Case 3.1: where we can get the solution by going up, that is, filling x and transferring from x to y until we get the value of z, we can verify this if we divide z by x and its remainder is equal to 0, that is, we are in the presence of an exact division, which validates the path as optimal.

Case 3.2: Where we can get the solution going down, that is, filling and then transferring from y to x, until we get the value of z, we can verify this if we first subtract y minus z and then enter x, if the remainder is 0 we conclude that the path is optimal.

Case 3.3: This case is the comparison of the 2 paths, both can have an optimal route going up, and an optimal route going down, but one of the two is shorter (if they are equal the path will be done going up).

Case 3.4: Brute force cases going up and down until we get the most optimal path.

NOTE: As in case 2.2 we have the same conditions to stop the algorithm of an infinite loop.

If in these cases there is no solution, null is returned.
