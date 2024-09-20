export const filteredList = (todoList, status, searchText) => {
  return todoList.filter((todo) => {
    const matchesSearchText = todo.todoName.toLowerCase().includes(searchText.toLowerCase());

    if (status === "All") {
      return matchesSearchText;
    }

    if (status === "Completed") {
      return matchesSearchText && todo.completed;
    }

    if (status === "Todo") {
      return matchesSearchText && !todo.completed;
    }

    // If none of the statuses match, return false (filter out the item)
    return false;
  });
}
