// Ganti dengan URL dan KEY kamu
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_KEY = 'your-anon-public-key';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Kirim pesan
document.getElementById('message-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  const { error } = await supabase.from('messages').insert({ name, message });

  if (error) {
    alert('Gagal mengirim pesan');
  } else {
    alert('Pesan berhasil dikirim');
    loadMessages();
  }
});

// Ambil dan tampilkan pesan
async function loadMessages() {
  const { data, error } = await supabase.from('messages').select().order('created_at', { ascending: false });

  const list = document.getElementById('messages-list');
  list.innerHTML = '';
  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name}: ${item.message}`;
    list.appendChild(li);
  });
}

loadMessages();
