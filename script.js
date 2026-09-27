document.body.classList.add('halaman-siap');

const elemenReveal = document.querySelectorAll('.reveal');
const observerReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            
            const anakBertahap = entry.target.querySelectorAll('.kartu, .accordion-item');
            anakBertahap.forEach((anak, i) => {
                anak.style.transitionDelay = `${i * 0.08}s`;
            });
            entry.target.classList.add('reveal-tampil');
            observerReveal.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
elemenReveal.forEach(el => observerReveal.observe(el));

const navbarUtama = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbarUtama.classList.toggle('navbar-scrolled', window.scrollY > 30);
});

const heroUtama = document.querySelector('.hero');
if (heroUtama) {
    heroUtama.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 16;
        const y = (e.clientY / window.innerHeight - 0.5) * 16;
        heroUtama.style.setProperty('--geser-x', `${x}px`);
        heroUtama.style.setProperty('--geser-y', `${y}px`);
    });
}

document.querySelectorAll('.btn-utama, .btn-garis').forEach(tombol => {
    tombol.addEventListener('click', function (e) {
        const riak = document.createElement('span');
        riak.classList.add('riak');
        const rect = this.getBoundingClientRect();
        const ukuran = Math.max(rect.width, rect.height);
        riak.style.width = riak.style.height = `${ukuran}px`;
        riak.style.left = `${e.clientX - rect.left - ukuran / 2}px`;
        riak.style.top = `${e.clientY - rect.top - ukuran / 2}px`;
        this.appendChild(riak);
        setTimeout(() => riak.remove(), 600);
    });
});

const inputCari = document.getElementById('pencarian');
if (inputCari) {
    const elemenDicari = document.querySelectorAll('.kartu, .accordion-item, .tabel-banding tbody tr');

    inputCari.addEventListener('input', () => {
        const kataKunci = inputCari.value.trim().toLowerCase();

        elemenDicari.forEach(el => {
            const cocok = el.textContent.toLowerCase().includes(kataKunci);
            el.style.display = (kataKunci === '' || cocok) ? '' : 'none';
        });
    });
}
