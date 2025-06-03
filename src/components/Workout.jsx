import React from "react";
import runImage from "../assets/images/running.jpg";

const MINUTE_COLORS = {
  30: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  1: "bg-sky-100 text-sky-800 border border-sky-300",
  5: "bg-emerald-100 text-emerald-800 border border-emerald-300",
  10: "bg-rose-100 text-rose-800 border border-rose-300",
};

const INTENSITY_COLORS = {
  easy: "bg-green-100 text-green-800 border-1 border-green-300",
  hard: "bg-red-100 text-red-800 border-1 border-red-300",
  fartlek: "bg-yellow-100 text-yellow-800 border-1 border-yellow-300",
  recovery: "bg-blue-100 text-blue-800 border-1 border-blue-300",
};

const Tag = React.memo(({ children, color = "bg-gray-200" }) => (
  <span className={`mr-3 inline-block px-3 py-1 text-sm font-semibold rounded-full capitalize ${color}`}>
    {children}
  </span>
));

const DurationInterval = React.memo(({ block }) => (
  <div className="py-5 px-3 rounded-lg bg-gray-50 text-left">
    <div className="text-sm text-gray-500">
      <Tag color={MINUTE_COLORS[block.duration.value]}>
        {block.duration.value} {block.duration.unit}
      </Tag>
      <Tag color={INTENSITY_COLORS[block.intensity]}>
        {block.intensity}
      </Tag>
      {block.note && <p className="mt-5">{block.note}</p>}
    </div>
  </div>
));

const SetBlockItem = React.memo(({ subBlock }) => {
  const { type, duration, intensity } = subBlock;
  
  if (type === "duration_interval" || type === "rest") {
    return (
      <React.Fragment key={`${type}-${duration.value}-${intensity}`}>
        <Tag color={MINUTE_COLORS[duration.value]}>
          {duration.value} {duration.unit}
        </Tag>
        <Tag color={INTENSITY_COLORS[intensity]}>
          {intensity}
        </Tag>
      </React.Fragment>
    );
  }
  return null;
});

const SetBlock = React.memo(({ block }) => (
  <div className="p-3 rounded-lg bg-gray-50">
    <h3 className="font-medium mb-3">Repeat main set for {block.reps} times.</h3>
    <div>
      {block.blocks.map((subBlock, index) => (
        <SetBlockItem key={`subBlock-${index}`} subBlock={subBlock} />
      ))}
    </div>
  </div>
));

const Block = React.memo(({ block }) => {
  switch (block.type) {
    case "duration_interval":
      return <DurationInterval block={block} />;
    default:
      return <SetBlock block={block} />;
  }
});

const Segment = React.memo(({ segment }) => (
  <section className="text-left border-l-4 border-indigo-500 bg-gray-100 text-indigo-800 pl-4 pr-2 py-2 rounded-md shadow-sm">
    <h2 className="text-xl capitalize font-semibold text-gray-700 mb-4">
      {segment.title}
    </h2>
    <div className="space-y-4">
      {segment.blocks.map((block, index) => (
        <Block key={`block-${index}`} block={block} />
      ))}
    </div>
  </section>
));

const WorkoutRenderer = ({ workout }) => (
  <div className="max-w-2xl mx-auto py-10 px-6 pt-0 bg-white rounded-xl shadow-xl">
    <header
      className="-m-6 mb-6 bg-cover bg-center rounded-xl p-15 grayscale-75"
      style={{ backgroundImage: `url(${runImage})` }}
    >
      <div className="relative z-10 bg-clip-content">
        <h1 className="text-2xl font-bold text-white">{workout.name}</h1>
        <p className="text-gray-300 mt-2">{workout.description}</p>
        <div className="flex items-center justify-center text-sm text-gray-500 mt-5">
          <Tag color="bg-white/20 backdrop-blur-xs text-white border-1 border-gray-500">
            Discipline: <span className="font-medium capitalize">{workout.discipline}</span>
          </Tag>
          <Tag color="bg-white/20 backdrop-blur-xs text-white border-1 border-gray-500">
            Duration: <span className="font-medium">{workout.duration.value} {workout.duration.unit}</span>
          </Tag>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
    </header>

    <div className="space-y-8">
      {workout.segments.map((segment, index) => (
        <Segment key={`segment-${index}`} segment={segment} />
      ))}
    </div>
  </div>
);

export default React.memo(WorkoutRenderer);