interface Badge {
  title: string;
}

const Badge = (props: Badge) => {
  return (
    <div className="bg-purple-100 text-purple-600 rounded-full px-2">
      #{props.title}
    </div>
  );
};

export default Badge;
