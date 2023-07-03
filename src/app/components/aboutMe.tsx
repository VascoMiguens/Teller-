import Image from "next/image";

const AboutMe = () => {
    return (
      <div id="about" className="bg-cover bg-center bg-image h-screen relative sm:w-full ">
        <div className="bg-overlay h-screen">
          <h1 className="text-5xl text-gray-500 font-bold ml-5 p-3">About me</h1>
          <div className="flex flex-wrap justify-center mt-10">
            <div className="w-5/6 md:flex-row-reverse">
              <img src="/images/about_me_pic.png" alt="Overlay Image" width={100} height={100} className="w-48 h-48 md:w-96 md:h-96 float-right md:ml-5" />
              <p className="text-white ml-2 md:mr-10 md:text-2xl">Del timent. Rebel behan. Ukara egortad. Jara porade. Decir. Tevit antenade. Dosesat semirövis. Immersiv tepängen. Kat fabelt. Parartad guligen. 
              Dyktig dekal. Del kros. Desade telerad. Bengen. Hågt dibel. Prenera. Syspens diadylingar. Jör. Ot besade. Beng trädmord. 
              Nyr aren. Treråktig kona. Tetrassade dilig. Heteronera spereren. Mil presosk. Diasm Sofie Bergström. Las resm. Nyktig. Diling kast. Ogisk jånas. 
              </p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default AboutMe;