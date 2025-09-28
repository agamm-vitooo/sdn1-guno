export default function VisiMisi() {
  return (
    <section className="relative py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Judul */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-12">
          Visi & Misi
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Visi */}
          <div className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Visi</h3>
            <p className="text-gray-700 leading-relaxed">
              Menjadi sekolah dasar unggulan yang menghasilkan generasi
              cerdas, berkarakter, berbudaya, dan berprestasi di tingkat
              nasional maupun internasional.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Misi</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
              <li>Menyelenggarakan pendidikan berkualitas berbasis nilai karakter.</li>
              <li>Mengembangkan kreativitas, inovasi, dan prestasi siswa.</li>
              <li>Membiasakan perilaku disiplin, jujur, dan tanggung jawab.</li>
              <li>Menciptakan lingkungan sekolah yang nyaman, aman, dan bersih.</li>
              <li>Menjalin kerjasama dengan orang tua dan masyarakat.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
