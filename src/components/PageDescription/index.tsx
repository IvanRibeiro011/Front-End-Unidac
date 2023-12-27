type PageDescriptionProps = {
  title: string;
  description: string;
  buttonName: string;
  onPerformButtonClick: () => void;
}

export default function PageDescription({ description, title, buttonName, onPerformButtonClick }: PageDescriptionProps) {
  return (
    <div className="flex justify-between items-center mt-4">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <span className="text-sm text-gray-400">{description}</span>
        </div>

        <button className="bg-green-500 p-2 rounded-lg text-white font-bold" onClick={onPerformButtonClick}>{buttonName}</button>
      </div>
  )
}