function WeatherWidget() {
  return (
    <article
      className="border shadow-sm break-inside relative overflow-hidden flex flex-col rounded-xl p-4 mb-3 text-sm bg-gray-900 text-white border-transparent"
      data-filter="weather"
    >
      <div className="absolute right-0 top-0 w-14 h-14 bg-lime-500/40 blur-2xl"></div>
      <section className="relative flex items-start justify-between gap-2 w-full">
        <header className="flex flex-col">
          <h2 className="text-lg font-medium">Tarragona</h2>
          <p className="text-gray-300">Salou</p>
        </header>
        <span className="text-3xl font-medium">21°</span>
      </section>
      <section className="relative mt-3 flex items-center gap-4">
        <p className="text-xs leading-4 text-gray-300">
          Lluvia - Sensación térmica 18° - Max 18° - Min 12°
        </p>
        <button className="inline-flex text-xs uppercase font-medium flex-none items-center justify-center px-3 h-8 transition-colors duration-200 rounded-full text-white bg-emerald-600 hover:bg-emerald-700">
          View more
        </button>
      </section>
    </article>
  );
}

export default WeatherWidget;
