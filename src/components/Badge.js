function Badge({ content }) {
    return (
        <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-l font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            {content}
        </span>
    );
}

export default Badge;
