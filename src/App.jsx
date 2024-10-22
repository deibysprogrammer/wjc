import "./App.css";
import { useState } from "react";

function App() {
  const [formBottles, setFormBottles] = useState({
    x: 7,
    y: 74,
    z: 2,
  });
  const [solution, setSolution] = useState([]);

  const clear = (e) => {
    e.preventDefault();
    setSolution([]);
  };

  function generarNumeroAleatorio(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomNumbers = (e) => {
    e.preventDefault();
    const x = generarNumeroAleatorio(1, 999);
    const y = generarNumeroAleatorio(x, 1000);
    const z = generarNumeroAleatorio(1, 1000);
    setFormBottles({ x, y, z });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const solved = wjc(formBottles);

    if (solved) {
      solved[solved.length - 1].descripcion =
        solved[solved.length - 1].descripcion + ".. SOLVED";
    }
    setSolution(solved);
  };

  const wjc = ({ x = 0, y = 0, z = 0 }) => {
    if (x > y) {
      const change = y;
      y = x;
      x = change;
    }

    let cont = 0;
    let pasos = [{ paso: 0, arreglo: [0, 0], descripcion: "initial state" }];

    let operaciones = {
      llenarx: {
        opDescription: "Fill x.",
        opFunction: (arreglo) => {
          return [x, arreglo[1]];
        },
      },
      llenary: {
        opDescription: "Fill y.",
        opFunction: (arreglo) => {
          return [arreglo[0], y];
        },
      },
      vaciarx: {
        opDescription: "Empty x.",
        opFunction: (arreglo) => {
          return [0, arreglo[1]];
        },
      },
      vaciary: {
        opDescription: "Empty y.",
        opFunction: (arreglo) => {
          return [arreglo[0], 0];
        },
      },
      transfxay: {
        opDescription: "Transfer x to y.",
        opFunction: (arreglo) => {
          let temp = Math.min(arreglo[0], y - arreglo[1]);
          return [arreglo[0] - temp, arreglo[1] + temp];
        },
      },
      transfyax: {
        opDescription: "Transfer y to x.",
        opFunction: (arreglo) => {
          let temp = Math.min(x - arreglo[0], arreglo[1]);
          return [arreglo[0] + temp, arreglo[1] - temp];
        },
      },
    };
    if (x === z) {
      pasos.push({
        paso: 1,
        arreglo: operaciones.llenarx.opFunction(pasos[0].arreglo),
        descripcion: operaciones.llenarx.opDescription,
      });
      return pasos;
    } else if (y === z) {
      pasos.push({
        paso: 1,
        arreglo: operaciones.llenary.opFunction(pasos[0].arreglo),
        descripcion: operaciones.llenary.opDescription,
      });
      return pasos;
    } else {
      if (z < x) {
        if (y % x === z) {
          cont++;
          pasos.push({
            paso: 1,
            arreglo: operaciones.llenary.opFunction(pasos[0].arreglo),
            descripcion: operaciones.llenary.opDescription,
          });
          cont += Math.floor(y / x) * 2 - 1;
          for (let i = 1; i < cont; i++) {
            if (i % 2 !== 0) {
              pasos.push({
                paso: i + 1,
                arreglo: operaciones.transfyax.opFunction(pasos[i].arreglo),
                descripcion: operaciones.transfyax.opDescription,
              });
            } else {
              pasos.push({
                paso: i + 1,
                arreglo: operaciones.vaciarx.opFunction(pasos[i].arreglo),
                descripcion: operaciones.vaciarx.opDescription,
              });
            }
          }
          return pasos;
        } else {
          let pasosBajada = 999999999;
          let pasosSubida = 999999999;
          let aux1 = y;
          cont++;

          while (y - (aux1 + x) !== 0 && (aux1 - z) % x !== 0) {
            let aux2 = x - (aux1 % x);
            cont += Math.floor(aux1 / x) * 2;
            cont += 4;
            aux1 = y - aux2;
          }

          if ((aux1 - z) % x === 0) {
            cont += ((aux1 - z) / x) * 2 - 1;
            pasosBajada = cont;
          }
          cont = 0;
          aux1 = 0;

          do {
            cont += Math.floor((y - aux1) / x) * 2;
            aux1 = x - ((y - aux1) % x);
            cont += 4;
          } while (
            x - ((y - aux1) % x) !== x &&
            x - ((y - aux1) % x) !== z &&
            aux1 !== z
          );

          if (x - ((y - aux1) % x) === z) {
            cont += Math.floor((y - aux1) / x) * 2 + 2;
            pasosSubida = cont;
          } else if (aux1 === z) {
            cont -= 2;
            pasosSubida = cont;
          }

          if (pasosBajada < pasosSubida) {
            if (pasosBajada !== 999999999) {
              pasos.push({
                paso: 1,
                arreglo: operaciones.llenary.opFunction(pasos[0].arreglo),
                descripcion: operaciones.llenary.opDescription,
              });
              for (let i = 1; i < pasosBajada; i++) {
                if (i % 2 !== 0) {
                  pasos.push({
                    paso: i + 1,
                    arreglo: operaciones.transfyax.opFunction(pasos[i].arreglo),
                    descripcion: operaciones.transfyax.opDescription,
                  });
                } else {
                  pasos.push({
                    paso: i + 1,
                    arreglo:
                      pasos[i].arreglo[0] !== 0 && pasos[i].arreglo[1] !== 0
                        ? operaciones.vaciarx.opFunction(pasos[i].arreglo)
                        : operaciones.llenary.opFunction(pasos[i].arreglo),
                    descripcion:
                      pasos[i].arreglo[0] !== 0 && pasos[i].arreglo[1] !== 0
                        ? operaciones.vaciarx.opDescription
                        : operaciones.llenary.opDescription,
                  });
                }
              }
              return pasos;
            }
          } else {
            if (pasosSubida !== 999999999) {
              for (let i = 1; i <= pasosSubida; i++) {
                if (i % 2 !== 0) {
                  pasos.push({
                    paso: i,
                    arreglo:
                      pasos[i - 1].arreglo[1] !== y
                        ? operaciones.llenarx.opFunction(pasos[i - 1].arreglo)
                        : operaciones.vaciary.opFunction(pasos[i - 1].arreglo),
                    descripcion:
                      pasos[i - 1].arreglo[1] !== y
                        ? operaciones.llenarx.opDescription
                        : operaciones.vaciarx.opDescription,
                  });
                } else {
                  pasos.push({
                    paso: i,
                    arreglo: operaciones.transfxay.opFunction(
                      pasos[i - 1].arreglo
                    ),
                    descripcion: operaciones.transfxay.opDescription,
                  });
                }
              }
              return pasos;
            }
          }
          return null;
        }
      } else if (z < y) {
        if (z % x === 0 && (y - z) % x === 0) {
          if ((z / x) * 2 <= ((y - z) / x) * 2) {
            for (let i = 1; i <= (z / x) * 2; i++) {
              if (i % 2 !== 0) {
                pasos.push({
                  paso: i,
                  arreglo: operaciones.llenarx.opFunction(pasos[i - 1].arreglo),
                  descripcion: operaciones.llenarx.opDescription,
                });
              } else {
                pasos.push({
                  paso: i,
                  arreglo: operaciones.transfxay.opFunction(
                    pasos[i - 1].arreglo
                  ),
                  descripcion: operaciones.transfxay.opDescription,
                });
              }
            }
            return pasos;
          } else {
            pasos.push({
              paso: 1,
              arreglo: operaciones.llenary.opFunction(pasos[0].arreglo),
              descripcion: operaciones.llenary.opDescription,
            });
            for (let i = 1; i < ((y - z) / x) * 2; i++) {
              if (i % 2 !== 0) {
                pasos.push({
                  paso: i + 1,
                  arreglo: operaciones.transfyax.opFunction(pasos[i].arreglo),
                  descripcion: operaciones.transfyax.opDescription,
                });
              } else {
                pasos.push({
                  paso: i + 1,
                  arreglo:
                    pasos[i].arreglo[0] !== 0 && pasos[i].arreglo[1] !== 0
                      ? operaciones.vaciarx.opFunction(pasos[i].arreglo)
                      : operaciones.llenary.opFunction(pasos[i].arreglo),
                  descripcion:
                    pasos[i].arreglo[0] !== 0 && pasos[i].arreglo[1] !== 0
                      ? operaciones.vaciarx.opDescription
                      : operaciones.llenary.opDescription,
                });
              }
            }
            return pasos;
          }
        } else if (z % x === 0) {
          for (let i = 1; i < (z / x) * 2; i++) {
            if (i % 2 !== 0) {
              pasos.push({
                paso: i + 1,
                arreglo: operaciones.llenarx.opFunction(pasos[i].arreglo),
                descripcion: operaciones.llenarx.opDescription,
              });
            } else {
              pasos.push({
                paso: i + 1,
                arreglo: operaciones.transfxay.opFunction(pasos[i].arreglo),
                descripcion: operaciones.transfxay.opDescription,
              });
            }
          }
          return pasos;
        } else if ((y - z) % x === 0) {
          pasos.push({
            paso: 1,
            arreglo: operaciones.llenary.opFunction(pasos[0].arreglo),
            descripcion: operaciones.llenary.opDescription,
          });
          for (let i = 1; i < ((y - z) / x) * 2; i++) {
            if (i % 2 !== 0) {
              pasos.push({
                paso: i + 1,
                arreglo: operaciones.transfyax.opFunction(pasos[i].arreglo),
                descripcion: operaciones.transfyax.opDescription,
              });
            } else {
              pasos.push({
                paso: i + 1,
                arreglo:
                  pasos[i].arreglo[0] !== 0 && pasos[i].arreglo[1] !== 0
                    ? operaciones.vaciarx.opFunction(pasos[i].arreglo)
                    : operaciones.llenary.opFunction(pasos[i].arreglo),
                descripcion:
                  pasos[i].arreglo[0] !== 0 && pasos[i].arreglo[1] !== 0
                    ? operaciones.vaciarx.opDescription
                    : operaciones.llenary.opDescription,
              });
            }
          }
          return pasos;
        } else {
          let pasosBajada = 999999999;
          let pasosSubida = 999999999;
          let aux1 = y;
          cont++;

          while (y - (aux1 + x) !== 0 && (aux1 - z) % x !== 0) {
            let aux2 = x - (aux1 % x);
            cont += Math.floor(aux1 / x) * 2;
            cont += 4;
            aux1 = y - aux2;
          }

          if ((aux1 - z) % x === 0) {
            cont += ((aux1 - z) / x) * 2 - 1;
            pasosBajada = cont;
          }
          cont = 0;
          aux1 = 0;

          do {
            cont += Math.floor((y - aux1) / x) * 2;
            aux1 = x - ((y - aux1) % x);
            cont += 4;
          } while (x - ((y - aux1) % x) !== x && (z - aux1) % x !== 0);

          if ((z - aux1) % x === 0) {
            cont += Math.floor((z - aux1) / x) * 2;
            pasosSubida = cont;
          }
          if (pasosBajada < pasosSubida) {
            if (pasosBajada !== 999999999) {
              pasos.push({
                paso: 1,
                arreglo: operaciones.llenary.opFunction(pasos[0].arreglo),
                descripcion: operaciones.llenary.opDescription,
              });
              for (let i = 1; i < pasosBajada; i++) {
                if (i % 2 !== 0) {
                  pasos.push({
                    paso: i + 1,
                    arreglo: operaciones.transfyax.opFunction(pasos[i].arreglo),
                    descripcion: operaciones.transfyax.opDescription,
                  });
                } else {
                  pasos.push({
                    paso: i + 1,
                    arreglo:
                      pasos[i].arreglo[0] !== 0 && pasos[i].arreglo[1] !== 0
                        ? operaciones.vaciarx.opFunction(pasos[i].arreglo)
                        : operaciones.llenary.opFunction(pasos[i].arreglo),
                    descripcion:
                      pasos[i].arreglo[0] !== 0 && pasos[i].arreglo[1] !== 0
                        ? operaciones.vaciarx.opDescription
                        : operaciones.llenary.opDescription,
                  });
                }
              }
              return pasos;
            }
          } else {
            if (pasosSubida !== 999999999) {
              for (let i = 1; i <= pasosSubida; i++) {
                if (i % 2 !== 0) {
                  pasos.push({
                    paso: i,
                    arreglo:
                      pasos[i - 1].arreglo[1] !== y
                        ? operaciones.llenarx.opFunction(pasos[i - 1].arreglo)
                        : operaciones.vaciary.opFunction(pasos[i - 1].arreglo),
                    descripcion:
                      pasos[i - 1].arreglo[1] !== y
                        ? operaciones.llenarx.opDescription
                        : operaciones.vaciary.opDescription,
                  });
                } else {
                  pasos.push({
                    paso: i,
                    arreglo: operaciones.transfxay.opFunction(
                      pasos[i - 1].arreglo
                    ),
                    descripcion: operaciones.transfxay.opDescription,
                  });
                }
              }
              return pasos;
            }
          }
          return null;
        }
      } else {
        // null case
        return null;
      }
    }
  };

  return (
    <div className="container">
      <h1 className="h1">Water bucket challenge 2024</h1>

      <form onSubmit={handleSubmit} className="form">
        {/* input */}
        <div className="form-inputs">
          <div className="request">
            <label htmlFor="x" className="label">
              Bottle X
            </label>
            <input
              value={formBottles.x}
              onChange={(e) =>
                setFormBottles({ ...formBottles, x: parseInt(e.target.value) })
              }
              type="number"
              className="input"
            />
          </div>
          {/* input */}
          <div className="request">
            <label htmlFor="y" className="label">
              Bottle Y
            </label>
            <input
              value={formBottles.y}
              onChange={(e) =>
                setFormBottles({ ...formBottles, y: parseInt(e.target.value) })
              }
              type="number"
              className="input"
            />
          </div>
          {/* input */}
          <div className="request">
            <label className="label">Bottle Z</label>
            <input
              value={formBottles.z}
              onChange={(e) =>
                setFormBottles({ ...formBottles, z: parseInt(e.target.value) })
              }
              type="number"
              className="input"
            />
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" className="button">
            Results
          </button>
          <button type="submit" className="button button-clear" onClick={clear}>
            Clear table
          </button>
          <button
            type="submit"
            className="button button-random-numbers"
            onClick={randomNumbers}
          >
            Random numbers
          </button>
        </div>
      </form>

      <div className={`table-container`}>
        <h2
          className={`h2${!solution || solution.length === 0 ? "" : " hidden"}`}
        >
          {!solution ? "There is no solution!" : "Set a number"}
        </h2>
        <table
          className={`table${
            !solution || solution.length === 0 ? " hidden" : ""
          }`}
        >
          <thead className="thead">
            <tr className="thead-tr">
              <th className="thead-th th-step">Step</th>
              <th className="thead-th th-x">x</th>
              <th className="thead-th th-y">y</th>
              <th className="thead-th th-description">Description</th>
            </tr>
          </thead>
          <tbody className="tboby">
            {solution !== null
              ? solution.map((paso) => (
                  <tr key={paso.paso} className="tboby-tr">
                    <td className="tboby-td td-step">{paso.paso}</td>
                    <td className="tboby-td td-x">{paso.arreglo[0]}</td>
                    <td className="tboby-td td-y">{paso.arreglo[1]}</td>
                    <td className="tboby-td td-description">
                      {paso.descripcion}
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
