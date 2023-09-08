function Badge({ content }) {
    return (
        <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-l font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
            {content}
        </span>
    );
}

export default Badge;
