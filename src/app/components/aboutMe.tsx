import Image from "next/image";

const AboutMe = () => {
    return (
      <div className="bg-cover bg-center bg-image h-screen relative">
        <div className="bg-overlay h-screen">
          <h1 className="text-5xl text-gray-500 font-bold ml-5 p-3">About me</h1>
          <div className="flex items-center justify-center">
            <div className="ml-10 basis-1/2 flex justify-center mr-5">
              <p className="text-white">Del timent. Rebel behan. Ukara egortad. Jara porade. Decir. Tevit antenade. Dosesat semirövis. Immersiv tepängen. Kat fabelt. Parartad guligen. 
              Dyktig dekal. Del kros. Desade telerad. Bengen. Hågt dibel. Prenera. Syspens diadylingar. Jör. Ot besade. Beng trädmord. 
              Nyr aren. Treråktig kona. Tetrassade dilig. Heteronera spereren. Mil presosk. Diasm Sofie Bergström. Las resm. Nyktig. Diling kast. Ogisk jånas. 
              </p>
            </div>
            <div className="mr-10 basis-1/3 flex justify-center">
              <Image src="/images/about_me_pic.png" alt="Overlay Image" width={100} height={100} className="w-96" />
            </div>
        </div>
      </div>
    </div>
    )
}

export default AboutMe;