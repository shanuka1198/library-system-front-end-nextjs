

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-cyan-950 text-white py-6 shadow-lg">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold">About S.I Book Library</h1>
                    <p className="mt-2 text-lg">A Gateway to Knowledge and Learning</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                <section className="text-center mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800">
                        Welcome to S.I Book Library
                    </h2>
                    <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                        At S.I Book Library, we believe that books hold the power to inspire, educate, and transform lives. Our library offers a wide range of books to cater to readers of all ages and interests.
                    </p>
                </section>

                <section className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-2xl font-semibold text-gray-800">
                            Our Mission
                        </h3>
                        <p className="mt-4 text-gray-600">
                            Our mission is to foster a love for reading and learning by providing access to a diverse collection of books and creating a welcoming environment for all book enthusiasts.
                        </p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-2xl font-semibold text-gray-800">
                            Our Vision
                        </h3>
                        <p className="mt-4 text-gray-600">
                            We envision a community enriched by knowledge, where people come together to explore, connect, and grow through the joy of reading.
                        </p>
                    </div>
                </section>

                <section className="mt-12 text-center">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        Why Choose Us?
                    </h3>
                    <ul className="mt-6 space-y-4 text-gray-600">
                        <li>A vast collection of books across multiple genres</li>
                        <li>Comfortable and serene reading spaces</li>
                        <li>Friendly staff passionate about books and knowledge</li>
                        <li>Regular workshops, book clubs, and community events</li>
                    </ul>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto text-center">
                    <p>© 2025 S.I Book Library. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}