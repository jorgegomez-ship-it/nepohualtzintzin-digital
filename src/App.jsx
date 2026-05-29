import React from 'react';

export default function NepohualtzintzinDigital() {
  const columnas = [
    1000000000000,
    100000000000,
    10000000000,
    1000000000,
    100000000,
    10000000,
    1000000,
    100000,
    10000,
    1000,
    100,
    10,
    1,
  ];

  const [estado, setEstado] = React.useState(
    columnas.map(() => ({
      superiores: [false, false, false],
      inferiores: [false, false, false, false],
    }))
  );

  const toggleCuenta = (columnaIndex, tipo, cuentaIndex) => {
    setEstado((prev) => {
      const nuevo = [...prev];

      nuevo[columnaIndex] = {
        ...nuevo[columnaIndex],
        [tipo]: nuevo[columnaIndex][tipo].map((valor, i) =>
          i === cuentaIndex ? !valor : valor
        ),
      };

      return nuevo;
    });
  };

  const calcularTotal = () => {
    return estado.reduce((acc, columna, index) => {
      const superioresActivas = columna.superiores.filter(Boolean).length;
      const inferioresActivas = columna.inferiores.filter(Boolean).length;

      const valorBase =
        superioresActivas * 5 + inferioresActivas;

      const subtotal = valorBase * columnas[index];

      return acc + subtotal;
    }, 0);
  };

  const reiniciarTablero = () => {
    setEstado(
      columnas.map(() => ({
        superiores: [false, false, false],
        inferiores: [false, false, false, false],
      }))
    );
  };

  return (
    <div className="min-h-screen bg-stone-100 p-2 sm:p-4 md:p-6 flex flex-col items-center overflow-hidden">

      <div className="w-full flex justify-center">
  <div className="w-full max-w-[1600px]">

          {/* TÍTULO */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800 mb-2 leading-tight">
              Nepohualtzintzin Digital
            </h1>
          </div>

          {/* BOTÓN */}
          <div className="flex justify-center mb-6">
            <button
              onClick={reiniciarTablero}
              className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-amber-700 hover:bg-amber-800 text-white rounded-2xl font-semibold shadow-lg transition-all duration-500 ease-in-out"
            >
              Reiniciar tablero
            </button>
          </div>

          {/* TABLERO */}
          <div className="bg-[#efe4cf] border-2 sm:border-4 border-[#cbb89d] rounded-2xl shadow-2xl p-2 sm:p-4 md:p-6 overflow-hidden">

            <div className="flex justify-center items-start gap-[1px] sm:gap-1 md:gap-2 w-full bg-[#f5ead7] border-2 border-[#9f8d72] rounded-xl p-1 sm:p-2 md:p-4 relative">

              {estado.map((columna, columnaIndex) => (
                <React.Fragment key={columnaIndex}>

                  {/* COLUMNA */}
                  <div className="relative flex flex-col items-center flex-1 min-w-0">

                    {/* BARRA VERTICAL */}
                    <div className="absolute top-0 bottom-0 w-[6px] bg-[#8b5a2b] rounded-full z-0"></div>

                    {/* MAÍCES SUPERIORES */}
                    <div className="flex flex-col gap-1 mb-6 z-10 min-h-[120px] sm:min-h-[150px] md:min-h-[180px] justify-start">

                      {columna.superiores.map((activa, cuentaIndex) => (
                        <button
                          key={`superior-${cuentaIndex}`}
                          type="button"
                          aria-label={`Cuenta superior ${cuentaIndex + 1}`}
                          onClick={() =>
                            toggleCuenta(
                              columnaIndex,
                              'superiores',
                              cuentaIndex
                            )
                          }
                          className={`
                            w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11
                            rounded-full
                            transition-all duration-500 ease-in-out
                            border-[3px]
                            shadow-md
                            relative
                            ${
                              activa
                                ? 'translate-y-8 bg-[#17a7b8] border-[#0d6f7a]'
                                : 'translate-y-0 bg-[#d63b3b] border-[#922222]'
                            }
                          `}
                        >
                          <div className="absolute inset-2 rounded-full border border-white/40"></div>
                        </button>
                      ))}

                    </div>

                    {/* BARRA HORIZONTAL */}
                    <div className="w-10 sm:w-16 md:w-20 h-[4px] bg-[#a11d1d] rounded-full z-20 mb-6"></div>

                    {/* MAÍCES INFERIORES */}
                    <div className="flex flex-col gap-1 z-10 min-h-[160px] sm:min-h-[200px] md:min-h-[240px] justify-end">

                      {columna.inferiores.map((activa, cuentaIndex) => (
                        <button
                          key={`inferior-${cuentaIndex}`}
                          type="button"
                          aria-label={`Cuenta inferior ${cuentaIndex + 1}`}
                          onClick={() =>
                            toggleCuenta(
                              columnaIndex,
                              'inferiores',
                              cuentaIndex
                            )
                          }
                          className={`
                            w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11
                            rounded-full
                            transition-all duration-500 ease-in-out
                            border-[3px]
                            shadow-md
                            relative
                            ${
                              activa
                                ? '-translate-y-8 bg-[#17a7b8] border-[#0d6f7a]'
                                : 'translate-y-0 bg-[#f0b22f] border-[#b27a0d]'
                            }
                          `}
                        >
                          <div className="absolute inset-2 rounded-full border border-white/40"></div>
                        </button>
                      ))}

                    </div>

                    {/* TEXTO VALOR */}
                    <div className="mt-3 text-center min-h-[40px] sm:min-h-[50px] flex items-start justify-center">

                      <div className="text-[8px] sm:text-[9px] md:text-xs font-bold text-[#6b4f2d] leading-tight break-words max-w-[48px] sm:max-w-[70px] md:max-w-[90px]">

                        {columnas[columnaIndex].toLocaleString()}

                      </div>

                    </div>

                  </div>

                  {/* SEPARADORES */}
                  {(columnaIndex === 0 ||
                    (
                      columnaIndex > 0 &&
                      columnaIndex % 3 === 0 &&
                      columnaIndex !== columnas.length - 1
                    )) && (

                    <div className="flex-shrink-0 self-stretch w-[12px] bg-[#7d1271] mx-2 sm:mx-4 md:mx-6 rounded-full"></div>

                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* RESULTADO */}
          <div className="mt-6 bg-white rounded-2xl shadow-xl p-6 text-center">

            <div className="text-stone-500 uppercase tracking-wider mb-2">
              Número representado
            </div>

            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-stone-800 mb-4 break-all">

              {calcularTotal().toLocaleString()}

            </div>

          </div>

          {/* FIRMA */}
          <div className="mt-8 text-center text-red-700 font-semibold text-sm sm:text-base">
            Con amor para Naye mi esposa ❤️
          </div>

        </div>

      </div>

    </div>
  );
}