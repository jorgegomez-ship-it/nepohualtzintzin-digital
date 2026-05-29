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

      // Maíces superiores = 5
      // Maíces inferiores = 1
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
      <div className="max-w-full xl:max-w-7xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800 mb-2 leading-tight">
            Nepohualtzintzin Digital
          </h1>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={reiniciarTablero}
            className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-amber-700 hover:bg-amber-800 text-white rounded-2xl font-semibold shadow-lg transition-all duration-500 ease-in-out w-full sm:w-auto"
          >
            Reiniciar tablero
          </button>
        </div>

        <div className="bg-[#efe4cf] border-2 sm:border-4 border-[#cbb89d] rounded-2xl shadow-2xl p-2 sm:p-4 md:p-6 w-full overflow-hidden">
          <div className="grid grid-cols-13 place-items-start gap-[2px] sm:gap-1 md:gap-2 w-full bg-[#f5ead7] border-2 border-[#9f8d72] rounded-xl p-1 sm:p-2 md:p-4 relative">
            {estado.map((columna, columnaIndex) => (
              <div
                key={columnaIndex}
                className={`relative flex flex-col items-center px-[1px] sm:px-1 md:px-2 ${
                  columnaIndex > 0 && (columnas.length - columnaIndex) % 3 === 1
                    ? 'border-r-4 border-[#8b5a2b] mr-1 sm:mr-2 md:mr-3 pr-1 sm:pr-2 md:pr-3'
                    : ''
                }`}
              >
                <div className="absolute top-0 bottom-0 w-[6px] bg-[#8b5a2b] rounded-full z-0"></div>

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
                        w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full transition-all duration-500 ease-in-out border-[3px]
                        shadow-md relative
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

                <div className="w-10 sm:w-16 md:w-20 h-[4px] bg-[#a11d1d] rounded-full z-20 mb-6"></div>

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
                        w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full transition-all duration-500 ease-in-out border-[3px]
                        shadow-md relative
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

                <div className="mt-3 text-center min-h-[40px] sm:min-h-[50px] flex items-start justify-center">
                  <div className="text-[8px] sm:text-[9px] md:text-xs font-bold text-[#6b4f2d] leading-tight break-words max-w-[48px] sm:max-w-[70px] md:max-w-[90px]">
                    {columnas[columnaIndex].toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-xl p-6 text-center">
          <div className="text-stone-500 uppercase tracking-wider mb-2">
            Número representado
          </div>

          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-stone-800 mb-4 break-all">
            {calcularTotal().toLocaleString()}
          </div>
        </div>
        <div className="mt-8 text-center text-red-700 font-semibold text-sm sm:text-base">
          Con amor para Naye mi esposa ❤️
        </div>
      </div>
    </div>
  );
}
