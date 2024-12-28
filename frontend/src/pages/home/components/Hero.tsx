import TrackingForm from "@/forms/tracking/TrackingForm";

const Hero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_2fr] gap-8 items-center py-12">
      <div className="flex flex-col gap-16 items-center">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold flex gap-4 items-center flex-wrap">
            Welcome to MoveIt
          </h1>
          <p className="text-lg text-center text-zinc-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            iure cum fugiat a vel explicabo rerum iusto tempora impedit?
            Reiciendis, incidunt ratione. Quibusdam, est amet?
          </p>
        </div>
        <TrackingForm />
      </div>
      <div>
        <img
          src="/images/home-hero-illustration.png"
          alt="hero"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Hero;
