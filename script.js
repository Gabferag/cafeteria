let selectedItems = [];

function addItem(name, price) {
  // Añadir el ítem seleccionado al array de selectedItems
  selectedItems.push({ name, price });
  updateSelectedItems();  // Actualiza la lista visualmente en la interfaz
  alert(`${name} añadido por ${price}€`);  // Muestra una alerta de confirmación
}

function updateSelectedItems() {
  // Actualiza la lista de ítems seleccionados en el DOM
  const orderList = document.getElementById('orderList');
  orderList.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos ítems
  selectedItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - ${item.price}€`;
    orderList.appendChild(listItem);
  });
}

function calculateTotal() {
  // Obtiene el pagador y el día de la semana
  const payer = document.getElementById('payer').value;
  const day = document.getElementById('day').value.trim();

  // Validación para asegurarse de que se haya seleccionado un pagador
  if (!payer) {
    alert('Por favor selecciona quién paga');
    return;
  }

  // Validación para asegurarse de que se haya ingresado un día de la semana
  if (!day) {
    alert('Por favor ingresa el día de la semana');
    return;
  }

  // Validación para asegurarse de que se haya seleccionado al menos un ítem
  if (selectedItems.length === 0) {
    alert('No hay ítems seleccionados');
    return;
  }

  // Calcula el total de los ítems seleccionados
  const total = selectedItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  // Agrega una nueva fila a la tabla de pagos
  const table = document.getElementById('paymentRecord');
  const row = table.insertRow(-1); // Inserta una fila al final de la tabla

  row.insertCell(0).textContent = day;  // Inserta el día de la semana
  row.insertCell(1).textContent = payer;  // Inserta el nombre del pagador
  row.insertCell(2).textContent = `${total}€`;  // Inserta el total pagado

  // Limpia la lista de ítems seleccionados después de realizar el pago
  selectedItems = [];
  updateSelectedItems();  // Actualiza la lista visualmente (vacía la lista)

  // Muestra una alerta con el total pagado
  alert(`Total de ${total}€ pagado por ${payer}`);
}
