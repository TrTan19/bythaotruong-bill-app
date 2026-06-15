const STORAGE_KEY = "thao-truong-makeup-bill:v1";
const CUSTOMERS_KEY = "thao-truong-makeup-bill:customers:v1";
const BRAND_NAME = "ByThaoTruong Makeup";
const BRAND_ADDRESS = "220/4/8 Hoàng Hoa Thám, Bình Lợi Trung, Hồ Chí Minh, Việt Nam";
const QR_FALLBACK_SRC = "./assets/vietqr-static.png";

const typeRules = {
  combo: { label: "MU + Hair", makeupPct: 60, hairPct: 40 },
  makeup: { label: "Makeup", makeupPct: 100, hairPct: 0 },
  hair: { label: "Hair", makeupPct: 0, hairPct: 100 },
  fee: { label: "Phụ phí", makeupPct: 0, hairPct: 0 },
  other: { label: "Khác", makeupPct: 0, hairPct: 0 },
};

const catalog = [
  { group: "Tùy chỉnh", name: "Dịch vụ tự nhập", price: 0, type: "other" },
  { group: "Tùy chỉnh", name: "Phụ phí tự nhập", price: 0, type: "fee" },
  { group: "Makeup tiệc", name: "Gói makeup tiệc normal", price: 600000, type: "combo" },
  { group: "Makeup tiệc", name: "Gói makeup premium", price: 800000, type: "combo" },
  { group: "Makeup tiệc", name: "Chụp profile", price: 600000, type: "combo" },
  { group: "Makeup tiệc", name: "Ngoại cảnh", price: 1000000, type: "combo" },
  { group: "Makeup tiệc", name: "Lookbook", price: 1000000, type: "combo" },
  { group: "Makeup tiệc", name: "Tốt nghiệp, kỷ yếu", price: 600000, type: "combo" },
  { group: "Cô dâu nội thành", name: "Makeup cô dâu", price: 3000000, type: "combo" },
  { group: "Cô dâu nội thành", name: "Dạm ngõ", price: 2000000, type: "combo" },
  { group: "Cô dâu nội thành", name: "Makeup test + Hair", price: 3000000, type: "combo" },
  { group: "Cô dâu nội thành", name: "Bà sui", price: 800000, type: "combo" },
  { group: "Cô dâu nội thành", name: "Chú rể", price: 400000, type: "combo" },
  { group: "Cô dâu nội thành", name: "Bưng quả", price: 600000, type: "combo" },
  { group: "Cô dâu nội thành", name: "Takecare makeup", price: 200000, unit: "giờ", type: "makeup" },
  { group: "Cô dâu nội thành", name: "Thay tóc", price: 0, type: "hair" },
  { group: "Cô dâu nội thành", name: "Thuê phím", price: 0, type: "other" },
  { group: "Cô dâu tỉnh", name: "Makeup cô dâu tiệc cưới", price: 4000000, type: "combo" },
  { group: "Cô dâu tỉnh", name: "Dạm ngõ", price: 3000000, type: "combo" },
  { group: "Cô dâu tỉnh", name: "Makeup test", price: 4000000, type: "combo" },
  { group: "Cô dâu tỉnh", name: "Bà sui", price: 1000000, type: "combo" },
  { group: "Cô dâu tỉnh", name: "Chú rể", price: 500000, type: "combo" },
  { group: "Cô dâu tỉnh", name: "Bưng quả", price: 600000, type: "combo" },
  { group: "Cô dâu tỉnh", name: "Takecare", price: 300000, unit: "giờ", type: "makeup" },
  { group: "Cô dâu tỉnh", name: "Thay tóc", price: 0, type: "hair" },
  { group: "Cô dâu tỉnh", name: "Thuê phím", price: 0, type: "other" },
  { group: "Phụ phí", name: "Di chuyển dưới 7km", price: 100000, type: "fee" },
  { group: "Phụ phí", name: "Di chuyển 7-10km", price: 200000, type: "fee" },
  { group: "Phụ phí", name: "Di chuyển dưới 10km / chuyên viên", price: 50000, type: "fee" },
  { group: "Phụ phí", name: "Taxi / vé xe 2 chiều", price: 0, type: "fee" },
  { group: "Phụ phí", name: "Phụ phí khách sạn", price: 0, type: "fee" },
  { group: "Phụ phí", name: "Overtime trước 6h", price: 100000, type: "fee" },
  { group: "Phụ phí", name: "Overtime trước 6h / chuyên viên", price: 50000, type: "fee" },
  { group: "Phụ phí", name: "Overtime trước 3h / chuyên viên", price: 100000, type: "fee" },
];

const icons = {
  save: '<svg viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>',
  rotate: '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v6h6"/></svg>',
  printer: '<svg viewBox="0 0 24 24"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/></svg>',
  "user-plus": '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M16 11h6"/></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>',
  "file-down": '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15l3 3 3-3"/></svg>',
  user: '<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  list: '<svg viewBox="0 0 24 24"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  receipt: '<svg viewBox="0 0 24 24"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/><path d="M14 8H8"/><path d="M16 12H8"/><path d="M13 16H8"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
};

let state = loadState();
let saveTimer = 0;

function defaultState() {
  const now = new Date();
  const event = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  return {
    invoiceNo: makeInvoiceNo(now),
    client: {
      customerName: "",
      customerPhone: "",
      customerAddress: "",
      eventAt: toDateInput(event),
      invoiceAt: toDateInput(now),
      customerNote: "",
    },
    business: {
      brandName: BRAND_NAME,
      brandPhone: "0364.503.686",
      brandAddress: BRAND_ADDRESS,
      brandFacebook: "https://www.facebook.com/thaoootruong",
      bankBin: "970407",
      bankAccount: "1503191019",
      bankAccountName: "HO KINH DOANH THAO TRUONG MAKEUP",
      merchantCode: "MS00P000000001205215",
      qrUrl: "",
      qrDataUrl: "",
    },
    lines: [],
    splits: {
      makeup: {
        source: "auto",
        customBase: 0,
        mode: "equal",
        people: [
          { id: uid(), name: BRAND_NAME, ratio: 1, fixed: 0 },
          { id: uid(), name: "Makeup artist", ratio: 1, fixed: 0 },
        ],
      },
      hair: {
        source: "auto",
        customBase: 0,
        mode: "ratio",
        people: [
          { id: uid(), name: BRAND_NAME, ratio: 6, fixed: 0 },
          { id: uid(), name: "Thợ hair", ratio: 4, fixed: 0 },
        ],
      },
    },
    showSplitOnPrint: false,
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return mergeState(defaultState(), saved);
  } catch {
    return defaultState();
  }
}

function mergeState(base, saved) {
  if (!saved || typeof saved !== "object") return base;
  const merged = {
    ...base,
    ...saved,
    client: { ...base.client, ...(saved.client || {}) },
    business: { ...base.business, ...(saved.business || {}) },
    splits: {
      makeup: { ...base.splits.makeup, ...(saved.splits?.makeup || {}) },
      hair: { ...base.splits.hair, ...(saved.splits?.hair || {}) },
    },
    lines: Array.isArray(saved.lines) ? saved.lines : base.lines,
  };
  if (["Thao Truong Makeup", "ThaoTruongMakeup"].includes(merged.business.brandName)) {
    merged.business.brandName = BRAND_NAME;
  }
  if (
    [
      "220/4/8 Hoang Hoa Tham, Binh Loi Trung, Binh Thanh cu",
      "220/4/8 Hoàng Hoa Thám, Bình Lợi Trung, Bình Thạnh cũ",
    ].includes(merged.business.brandAddress)
  ) {
    merged.business.brandAddress = BRAND_ADDRESS;
  }
  ["makeup", "hair"].forEach((kind) => {
    merged.splits[kind].people = (merged.splits[kind].people || []).map((person) => ({
      ...person,
      name: ["Thao Truong Makeup", "ThaoTruongMakeup"].includes(person.name) ? BRAND_NAME : person.name,
    }));
  });
  return merged;
}

// ── CUSTOMER HISTORY ──────────────────────────────────────────────────────────

function loadCustomers() {
  try { return JSON.parse(localStorage.getItem(CUSTOMERS_KEY)) || []; }
  catch { return []; }
}

function saveCustomerToHistory() {
  const { customerName, customerPhone, customerAddress } = state.client;
  if (!customerName && !customerPhone) return;
  const totals = getTotals();
  const customers = loadCustomers();
  const idx = customers.findIndex(c => c.phone && c.phone === customerPhone && customerPhone);
  if (idx >= 0) {
    const c = customers[idx];
    c.name = customerName || c.name;
    c.address = customerAddress || c.address;
    c.lastVisit = new Date().toISOString();
    c.visitCount = (c.visitCount || 1) + 1;
    c.totalSpent = (c.totalSpent || 0) + totals.total;
    customers.splice(idx, 1);
    customers.unshift(c);
  } else {
    customers.unshift({
      id: uid(), name: customerName, phone: customerPhone,
      address: customerAddress, lastVisit: new Date().toISOString(),
      visitCount: 1, totalSpent: totals.total,
    });
  }
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers.slice(0, 200)));
  renderCustomerHistory();
}

function fillCustomer(customer) {
  state.client.customerName = customer.name || "";
  state.client.customerPhone = customer.phone || "";
  state.client.customerAddress = customer.address || "";
  setFormValues("client-form", state.client);
  renderCalculations();
  queueSave();
  closeAutocomplete();
}

function deleteCustomer(id) {
  const customers = loadCustomers().filter(c => c.id !== id);
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
  renderCustomerHistory();
}

function renderCustomerHistory() {
  const body = document.getElementById("history-body");
  const countEl = document.getElementById("history-count");
  if (!body) return;
  const customers = loadCustomers();
  if (countEl) countEl.textContent = customers.length ? `${customers.length}` : "";
  if (!customers.length) {
    body.innerHTML = `<div class="history-empty">Chưa có khách hàng nào.<br>Nhấn "In hóa đơn" để lưu khách tự động.</div>`;
    return;
  }
  body.innerHTML = customers.slice(0, 50).map(c => `
    <div class="history-item">
      <div class="history-info" data-fill-id="${escapeAttr(c.id)}">
        <strong>${escapeHtml(c.name || "Không tên")}</strong>
        <span>${escapeHtml(c.phone || "")}</span>
        ${c.address ? `<span class="history-addr">${escapeHtml(c.address)}</span>` : ""}
      </div>
      <div class="history-meta">
        <span>${c.visitCount || 1} lần</span>
        <span>${formatShortMoney(c.totalSpent || 0)}</span>
      </div>
      <button class="history-pick" type="button" data-fill-id="${escapeAttr(c.id)}">Chọn</button>
      <button class="history-del" type="button" data-del-id="${escapeAttr(c.id)}" title="Xóa">✕</button>
    </div>
  `).join("");
}

// Autocomplete
function closeAutocomplete() {
  document.querySelectorAll(".ac-drop").forEach(el => el.remove());
}

function showAutocomplete(input, results) {
  closeAutocomplete();
  if (!results.length) return;
  const drop = document.createElement("div");
  drop.className = "ac-drop";
  drop.innerHTML = results.map(c => `
    <div class="ac-item" data-id="${escapeAttr(c.id)}">
      <span class="ac-name">${escapeHtml(c.name || "-")}</span>
      <span class="ac-phone">${escapeHtml(c.phone || "")}</span>
      <span class="ac-visits">${c.visitCount || 1} lần · ${formatShortMoney(c.totalSpent || 0)}</span>
    </div>
  `).join("");
  drop.addEventListener("mousedown", e => {
    const item = e.target.closest(".ac-item");
    if (!item) return;
    e.preventDefault();
    const customer = loadCustomers().find(c => c.id === item.dataset.id);
    if (customer) fillCustomer(customer);
  });
  input.closest(".ac-wrap").appendChild(drop);
}

function bindAutocomplete(fieldName) {
  const input = document.querySelector(`[name="${fieldName}"]`);
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.trim();
    showAutocomplete(input, q.length >= 1 ? loadCustomers().filter(c =>
      (c.name && c.name.toLowerCase().includes(q.toLowerCase())) ||
      (c.phone && c.phone.includes(q))
    ).slice(0, 6) : []);
  });
  input.addEventListener("blur", () => setTimeout(closeAutocomplete, 180));
  input.addEventListener("focus", () => {
    if (input.value.trim()) {
      const q = input.value.trim();
      showAutocomplete(input, loadCustomers().filter(c =>
        (c.name && c.name.toLowerCase().includes(q.toLowerCase())) ||
        (c.phone && c.phone.includes(q))
      ).slice(0, 6));
    }
  });
}

// ── END CUSTOMER HISTORY ──────────────────────────────────────────────────────

function switchTab(tabName) {
  document.querySelectorAll(".sidebar-btn").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.tab === tabName)
  );
  document.querySelectorAll(".tab-panel").forEach(panel => {
    const show = panel.dataset.panel === tabName;
    panel.style.display = show ? "" : "none";
  });
  if (tabName === "history") renderCustomerHistory();
  if (tabName === "bill") renderCalculations();
  // Tab "Hóa đơn": cho hóa đơn chiếm toàn chiều rộng (ẩn cột nhập liệu)
  const workspace = document.querySelector(".workspace");
  if (workspace) workspace.classList.toggle("bill-active", tabName === "bill");
  // Tab "bill" trên mobile — hiện side-stack
  const sideStack = document.querySelector(".side-stack");
  if (sideStack) {
    sideStack.classList.toggle("mobile-tab-active", tabName === "bill");
  }
}

function init() {
  registerOfflineApp();
  renderIcons();
  renderServicePicker();
  renderQuickServices();
  bindEvents();
  renderAll();
  renderCustomerHistory();
  bindAutocomplete("customerName");
  bindAutocomplete("customerPhone");
  switchTab("client");

  document.querySelector(".app-sidebar").addEventListener("click", e => {
    const btn = e.target.closest(".sidebar-btn");
    if (btn) switchTab(btn.dataset.tab);
  });
}

// Không dùng Service Worker nữa: gỡ mọi SW cũ và xóa sạch cache để mỗi lần
// refresh đều tải bản mới nhất từ server.
function registerOfflineApp() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then((regs) => regs.forEach((reg) => reg.unregister()))
      .catch(() => {});
  }
  if ("caches" in window) {
    caches.keys().then((keys) => keys.forEach((key) => caches.delete(key))).catch(() => {});
  }
}

function renderIcons() {
  document.querySelectorAll("[data-icon]").forEach((node) => {
    node.innerHTML = icons[node.dataset.icon] || "";
  });
}

function renderServicePicker() {
  const picker = document.getElementById("service-picker");
  const groups = [...new Set(catalog.map((item) => item.group))];
  picker.innerHTML = groups
    .map((group) => {
      const options = catalog
        .filter((item) => item.group === group)
        .map((item, index) => {
          const id = catalog.indexOf(item);
          return `<option value="${id}">${escapeHtml(item.name)} - ${formatMoney(item.price)}</option>`;
        })
        .join("");
      return `<optgroup label="${escapeHtml(group)}">${options}</optgroup>`;
    })
    .join("");
}

function renderQuickServices() {
  const quick = document.getElementById("quick-services");
  const groups = [...new Set(catalog.map((item) => item.group))];
  quick.innerHTML = groups
    .map((group) => {
      const chips = catalog
        .filter((item) => item.group === group)
        .map((item) => {
          const index = catalog.indexOf(item);
          return `<button class="quick-chip" type="button" data-add-catalog="${index}">${escapeHtml(item.name)} - ${formatShortMoney(item.price)}</button>`;
        })
        .join("");
      return `
        <section class="quick-group">
          <div class="quick-group-title">${escapeHtml(group)}</div>
          <div class="quick-chip-list">${chips}</div>
        </section>
      `;
    })
    .join("");
}

function bindEvents() {
  document.getElementById("client-form").addEventListener("input", (event) => {
    const field = event.target.name;
    if (!field) return;
    state.client[field] = event.target.value;
    renderCalculations();
    queueSave();
  });

  document.getElementById("business-form").addEventListener("input", (event) => {
    const field = event.target.name;
    if (!field) return;
    state.business[field] = event.target.value;
    renderCalculations();
    queueSave();
  });

  document.getElementById("add-service").addEventListener("click", () => {
    const index = Number(document.getElementById("service-picker").value || 0);
    addCatalogLine(index);
  });

  document.getElementById("quick-services").addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-catalog]");
    if (!button) return;
    addCatalogLine(Number(button.dataset.addCatalog));
  });

  document.getElementById("line-body").addEventListener("input", updateLineFromEvent);
  document.getElementById("line-body").addEventListener("change", updateLineFromEvent);
  document.getElementById("line-body").addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-line]");
    if (!button) return;
    state.lines = state.lines.filter((line) => line.id !== button.dataset.deleteLine);
    renderLines();
    renderCalculations();
    queueSave();
  });

  document.getElementById("show-split-on-print").addEventListener("change", (event) => {
    state.showSplitOnPrint = event.target.checked;
    renderCalculations();
    queueSave();
  });

  // Reformat price inputs khi rời ô (blur)
  document.addEventListener("blur", (event) => {
    const target = event.target;
    if (!target.dataset.price) return;
    const raw = target.dataset.lineField === "unitPrice" || target.dataset.personField === "fixed" || target.dataset.splitField === "customBase";
    if (raw) target.value = formatPriceInput(target.value) || "";
  }, true);

  // Thêm dấu chấm ngay khi đang gõ ở các ô tiền
  document.addEventListener("input", (event) => {
    const target = event.target;
    if (!target.dataset || !target.dataset.price) return;
    const formatted = formatPriceInput(target.value);
    if (target.value !== formatted) {
      target.value = formatted;
      target.setSelectionRange(formatted.length, formatted.length);
    }
  });

  // Bấm vào ô nhập là tự bôi đen toàn bộ để gõ đè (không cần xóa tay)
  let justFocused = false;
  const isTextField = (el) => el && el.matches && el.matches('input[type="text"], input[type="number"]');
  document.addEventListener("focusin", (event) => {
    if (isTextField(event.target)) {
      justFocused = true;
      event.target.select();
    }
  });
  document.addEventListener("mouseup", (event) => {
    if (justFocused && isTextField(event.target)) event.preventDefault();
    justFocused = false;
  });

  document.getElementById("qr-upload").addEventListener("change", handleQrUpload);

  document.getElementById("history-body").addEventListener("click", e => {
    const fillBtn = e.target.closest("[data-fill-id]");
    if (fillBtn) {
      const customer = loadCustomers().find(c => c.id === fillBtn.dataset.fillId);
      if (customer) { fillCustomer(customer); switchTab("client"); }
      return;
    }
    const delBtn = e.target.closest("[data-del-id]");
    if (delBtn) deleteCustomer(delBtn.dataset.delId);
  });
  document.getElementById("save-state").addEventListener("click", saveState);
  document.getElementById("reset-state").addEventListener("click", resetState);
  document.getElementById("print-bill").addEventListener("click", printBill);
  document.getElementById("print-bill-bottom").addEventListener("click", printBill);
  document.getElementById("download-bill").addEventListener("click", savePdf);
  document.getElementById("download-json").addEventListener("click", downloadJson);
}

function renderAll() {
  document.getElementById("invoice-no-pill").textContent = state.invoiceNo;
  setFormValues("client-form", state.client);
  setFormValues("business-form", state.business);
  document.getElementById("show-split-on-print").checked = Boolean(state.showSplitOnPrint);
  document.getElementById("qr-upload-name").textContent = state.business.qrDataUrl ? "Đã lưu ảnh QR upload" : "Chưa chọn file";
  renderLines();
  renderTeamDatalist();
  renderCalculations();
}

function setFormValues(formId, values) {
  const form = document.getElementById(formId);
  Object.entries(values).forEach(([key, value]) => {
    const input = form.elements.namedItem(key);
    if (input) input.value = value ?? "";
  });
}

function addCatalogLine(index) {
  const item = catalog[index];
  if (!item) return;
  const rule = typeRules[item.type] || typeRules.other;
  // Dòng makeup/combo mặc định trả 100% giá cho artist (sửa được); còn lại để 0
  const defaultPayout = (item.type === "combo" || item.type === "makeup") ? item.price : 0;
  state.lines.push({
    id: uid(),
    name: item.name,
    qty: 1,
    unitPrice: item.price,
    type: item.type,
    makeupPct: rule.makeupPct,
    hairPct: rule.hairPct,
    assignee: "",
    payout: defaultPayout,
  });
  renderLines();
  renderCalculations();
  queueSave();
}

function renderLines() {
  const body = document.getElementById("line-body");
  if (!state.lines.length) {
    body.innerHTML = `<tr><td class="empty-line" colspan="8">Chưa có dòng dịch vụ</td></tr>`;
    return;
  }
  body.innerHTML = state.lines.map(renderLineRow).join("");
  renderIcons();
}

function renderLineRow(line) {
  const typeOptions = Object.entries(typeRules)
    .map(([value, rule]) => `<option value="${value}" ${line.type === value ? "selected" : ""}>${escapeHtml(rule.label)}</option>`)
    .join("");

  return `
    <tr data-line-id="${escapeAttr(line.id)}">
      <td class="line-name-cell" data-label="Nội dung"><input data-line-field="name" value="${escapeAttr(line.name)}" aria-label="Nội dung" /></td>
      <td data-label="SL"><input data-line-field="qty" type="number" min="0" step="0.5" value="${numberValue(line.qty)}" aria-label="Số lượng" /></td>
      <td data-label="Đơn giá"><input data-line-field="unitPrice" type="text" inputmode="numeric" value="${formatPriceInput(line.unitPrice)}" aria-label="Đơn giá" data-price /></td>
      <td data-label="Loại"><select data-line-field="type" aria-label="Loại">${typeOptions}</select></td>
      <td data-label="Người làm"><input data-line-field="assignee" value="${escapeAttr(line.assignee || "")}" list="team-names" placeholder="Tên" aria-label="Người làm" /></td>
      <td data-label="Tiền trả"><input data-line-field="payout" type="text" inputmode="numeric" value="${formatPriceInput(line.payout)}" data-price aria-label="Tiền trả" /></td>
      <td class="money-cell line-total-cell" data-label="Thành tiền" data-total-cell>${formatMoney(lineTotal(line))}</td>
      <td class="line-action-cell"><button class="delete-line" type="button" data-delete-line="${escapeAttr(line.id)}" title="Xóa dòng"><span class="icon" data-icon="trash"></span></button></td>
    </tr>
  `;
}

function updateLineFromEvent(event) {
  const target = event.target;
  const row = target.closest("[data-line-id]");
  const field = target.dataset.lineField;
  if (!row || !field) return;
  const line = state.lines.find((item) => item.id === row.dataset.lineId);
  if (!line) return;

  if (field === "name") {
    line.name = target.value;
  } else if (field === "assignee") {
    line.assignee = target.value;
    renderTeamDatalist();
  } else if (field === "payout") {
    line.payout = priceToNumber(target.value);
  } else if (field === "type") {
    line.type = target.value;
    const rule = typeRules[line.type] || typeRules.other;
    line.makeupPct = rule.makeupPct;
    line.hairPct = rule.hairPct;
    // Chuyển sang makeup/combo mà chưa có tiền trả -> tự gợi ý 100% giá dòng
    if ((line.type === "combo" || line.type === "makeup") && !toNumber(line.payout)) {
      line.payout = lineTotal(line);
    }
    renderLines();
  } else if (field === "unitPrice") {
    line[field] = priceToNumber(target.value);
    const totalCell = row.querySelector("[data-total-cell]");
    if (totalCell) totalCell.textContent = formatMoney(lineTotal(line));
  } else {
    line[field] = toNumber(target.value);
    const totalCell = row.querySelector("[data-total-cell]");
    if (totalCell) totalCell.textContent = formatMoney(lineTotal(line));
  }
  renderCalculations();
  queueSave();
}

function renderSplitControls(kind) {
  const split = state.splits[kind];
  document.querySelectorAll(`[data-kind="${kind}"][data-split-field]`).forEach((input) => {
    const field = input.dataset.splitField;
    input.value = field === "customBase" ? formatPriceInput(split[field]) : (split[field] ?? "");
    // Ô "Số tiền nhập tay" chỉ hiện khi nguồn tiền là "Nhập tay"
    if (field === "customBase") {
      const label = input.closest("label");
      if (label) label.style.display = split.source === "custom" ? "" : "none";
    }
  });
}

function renderPeople(kind) {
  const list = document.getElementById(`${kind}-people`);
  const split = state.splits[kind];
  // Gắn kiểu chia để CSS ẩn cột Tỉ lệ / Tiền nhập không cần thiết
  list.dataset.mode = split.mode || "equal";
  if (!split.people.length) {
    list.innerHTML = `<div class="share-warning">Chưa có người nhận chia.</div>`;
    return;
  }
  list.innerHTML = split.people.map((person) => renderPersonRow(kind, person)).join("");
  renderIcons();
}

function renderPersonRow(kind, person) {
  return `
    <div class="person-row" data-kind="${kind}" data-person-id="${escapeAttr(person.id)}">
      <label class="pr-name">
        Tên người
        <input data-person-field="name" value="${escapeAttr(person.name)}" />
      </label>
      <label class="pr-ratio">
        Tỉ lệ
        <input data-person-field="ratio" type="number" min="0" step="0.5" value="${numberValue(person.ratio)}" />
      </label>
      <label class="pr-fixed">
        Tiền nhập
        <input data-person-field="fixed" type="text" inputmode="numeric" value="${formatPriceInput(person.fixed)}" data-price />
      </label>
      <button class="delete-person" type="button" data-kind="${kind}" data-delete-person="${escapeAttr(person.id)}" title="Xóa người">
        <span class="icon" data-icon="trash"></span>
      </button>
    </div>
  `;
}

function updateSplitFromEvent(event) {
  const target = event.target;
  const kind = target.dataset.kind;
  const field = target.dataset.splitField;
  if (!kind || !field) return;
  state.splits[kind][field] = field === "customBase" ? priceToNumber(target.value) : target.value;
  // Đổi nguồn tiền -> ẩn/hiện ô nhập tay; đổi kiểu chia -> ẩn/hiện cột tỉ lệ/tiền nhập
  if (field === "source") renderSplitControls(kind);
  if (field === "mode") renderPeople(kind);
  renderCalculations();
  queueSave();
}

function updatePersonFromEvent(event) {
  const target = event.target;
  const row = target.closest("[data-person-id]");
  const field = target.dataset.personField;
  if (!row || !field) return;
  const split = state.splits[row.dataset.kind];
  const person = split.people.find((item) => item.id === row.dataset.personId);
  if (!person) return;
  person[field] = field === "name" ? target.value : (field === "fixed" ? priceToNumber(target.value) : toNumber(target.value));
  renderCalculations();
  queueSave();
}

function handleQrUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.business.qrDataUrl = String(reader.result || "");
    document.getElementById("qr-upload-name").textContent = file.name;
    renderCalculations();
    queueSave();
  };
  reader.readAsDataURL(file);
}

function renderCalculations() {
  const totals = getTotals();
  document.getElementById("subtotal-label").textContent = formatMoney(totals.subtotal);
  document.getElementById("grand-total-label").textContent = formatMoney(totals.total);
  document.getElementById("makeup-base-label").textContent = formatMoney(totals.teamPayout);
  document.getElementById("hair-base-label").textContent = formatMoney(totals.shopKeep);

  renderPayoutSummary(totals);
  renderInvoicePreview(totals);
}

function getTotals() {
  const subtotal = state.lines.reduce((sum, line) => sum + lineTotal(line), 0);
  const teamPayout = state.lines.reduce((sum, line) => sum + (toNumber(line.payout) || 0), 0);
  const shopKeep = subtotal - teamPayout;
  // Cộng tiền theo từng người làm
  const byPerson = {};
  state.lines.forEach((line) => {
    const amount = toNumber(line.payout) || 0;
    if (amount <= 0) return;
    const name = (line.assignee || "").trim() || "Chưa gán tên";
    byPerson[name] = (byPerson[name] || 0) + amount;
  });
  return { subtotal, total: subtotal, teamPayout, shopKeep, byPerson };
}

function renderPayoutSummary(totals = getTotals()) {
  const node = document.getElementById("payout-summary");
  if (!node) return;
  const entries = Object.entries(totals.byPerson);
  let html = "";
  if (!entries.length) {
    html = `<div class="payout-empty">Chưa gán tiền cho ai. Điền cột "Người làm" và "Tiền trả" ở bảng dịch vụ.</div>`;
  } else {
    html = entries
      .map(([name, amount]) => `<div class="payout-row"><span>${escapeHtml(name)}</span><strong>${formatMoney(amount)}</strong></div>`)
      .join("");
  }
  html += `<div class="payout-row payout-keep"><span>Shop giữ lại</span><strong>${formatMoney(totals.shopKeep)}</strong></div>`;
  node.innerHTML = html;
}

function renderTeamDatalist() {
  const dl = document.getElementById("team-names");
  if (!dl) return;
  const names = [...new Set(state.lines.map((l) => (l.assignee || "").trim()).filter(Boolean))];
  dl.innerHTML = names.map((n) => `<option value="${escapeAttr(n)}"></option>`).join("");
}

function renderSplitResult(kind, totals) {
  const base = getSplitBase(kind, totals);
  const result = calculateSplit(state.splits[kind], base);
  document.getElementById(`${kind}-source-label`).textContent = `Quỹ chia: ${formatMoney(base)}`;
  const resultNode = document.getElementById(`${kind}-result`);
  const rows = result.rows
    .map((row) => {
      return `<div class="share-row"><span>${escapeHtml(row.name || "Chưa đặt tên")}</span><strong>${formatMoney(row.amount)}</strong><span>${formatPercent(row.percent)}</span></div>`;
    })
    .join("");
  const warning = result.warning ? `<div class="share-warning">${escapeHtml(result.warning)}</div>` : "";
  resultNode.innerHTML = rows + warning;
}

function getSplitBase(kind, totals) {
  const split = state.splits[kind];
  if (split.source === "total") return totals.total;
  if (split.source === "custom") return toNumber(split.customBase);
  return kind === "makeup" ? totals.makeupBase : totals.hairBase;
}

function calculateSplit(split, base) {
  const people = split.people || [];
  if (!people.length) return { rows: [], warning: "Chưa có người nhận chia." };
  const safeBase = Math.max(0, base);
  let rows = [];
  let warning = "";

  if (split.mode === "fixed") {
    rows = people.map((person) => ({ name: person.name, amount: toNumber(person.fixed) }));
    const diff = safeBase - rows.reduce((sum, row) => sum + row.amount, 0);
    if (Math.abs(diff) >= 1) warning = `Còn chênh lệch ${formatMoney(diff)} so với quỹ chia.`;
  } else if (split.mode === "fixedPlusRatio") {
    const fixedTotal = people.reduce((sum, person) => sum + toNumber(person.fixed), 0);
    const remaining = safeBase - fixedTotal;
    const ratioTotal = people.reduce((sum, person) => sum + Math.max(0, toNumber(person.ratio)), 0);
    if (remaining < 0) warning = `Tiền cố định đang vượt quỹ ${formatMoney(Math.abs(remaining))}.`;
    rows = people.map((person) => {
      const ratioPart = ratioTotal > 0 ? Math.max(0, remaining) * Math.max(0, toNumber(person.ratio)) / ratioTotal : 0;
      return { name: person.name, amount: toNumber(person.fixed) + ratioPart };
    });
  } else if (split.mode === "ratio") {
    const ratioTotal = people.reduce((sum, person) => sum + Math.max(0, toNumber(person.ratio)), 0);
    rows = people.map((person) => {
      const ratio = ratioTotal > 0 ? Math.max(0, toNumber(person.ratio)) / ratioTotal : 1 / people.length;
      return { name: person.name, amount: safeBase * ratio };
    });
  } else {
    rows = people.map((person) => ({ name: person.name, amount: safeBase / people.length }));
  }

  rows = rows.map((row) => ({
    ...row,
    amount: Math.round(row.amount),
    percent: safeBase > 0 ? row.amount / safeBase * 100 : 0,
  }));
  return { rows, warning };
}

function renderInvoicePreview(totals = getTotals()) {
  document.getElementById("print-area").innerHTML = buildInvoiceHtml(totals);
}

function buildInvoiceHtml(totals) {
  const qrSrc = getQrSrc(totals.total);
  const qrFallbackSrc = escapeAttr(QR_FALLBACK_SRC);
  const splitHtml = state.showSplitOnPrint ? buildInternalSplitHtml(totals) : "";
  const rows = state.lines.length
    ? state.lines.map((line, index) => `
        <tr>
          <td data-label="Nội dung"><span class="line-index">${index + 1}</span>${escapeHtml(line.name)}</td>
          <td data-label="SL">${formatQty(line.qty)}</td>
          <td data-label="Đơn giá">${formatMoney(line.unitPrice)}</td>
          <td data-label="Thành tiền">${formatMoney(lineTotal(line))}</td>
        </tr>
      `).join("")
    : `<tr><td colspan="4" class="empty-line">Chưa có dòng dịch vụ</td></tr>`;

  const eventAt = formatDateTime(state.client.eventAt);
  const invoiceAt = formatDateTime(state.client.invoiceAt);
  const note = getTransferNote();
  const lineCount = state.lines.length;

  return `
    <article class="invoice-paper">
      <header class="invoice-header">
        <div class="invoice-brand-block">
          <p class="invoice-kicker">Hóa đơn dịch vụ</p>
          <div class="invoice-brand">${escapeHtml(state.business.brandName)}</div>
          <div class="invoice-meta">
            <span>Phone/Zalo: ${escapeHtml(state.business.brandPhone)}</span>
            <span>Địa chỉ: ${escapeHtml(state.business.brandAddress)}</span>
            <span>${escapeHtml(state.business.brandFacebook)}</span>
          </div>
        </div>
        <div class="invoice-title">
          <span>Mã hóa đơn</span>
          <h2>${escapeHtml(state.invoiceNo)}</h2>
          <span>Ngày lập: ${escapeHtml(invoiceAt)}</span>
        </div>
      </header>

      <section class="invoice-section invoice-client">
        <div class="invoice-section-heading">
          <span>Thông tin khách hàng</span>
          <strong>${escapeHtml(state.client.customerName || "Khách lẻ")}</strong>
        </div>
        <div class="customer-grid">
          <div class="info-block"><span>Số điện thoại</span><strong>${escapeHtml(state.client.customerPhone || "-")}</strong></div>
          <div class="info-block"><span>Thời gian hẹn</span><strong>${escapeHtml(eventAt || "-")}</strong></div>
          <div class="info-block wide"><span>Địa chỉ làm việc</span><strong>${escapeHtml(state.client.customerAddress || "-")}</strong></div>
          <div class="info-block wide"><span>Ghi chú</span><strong>${escapeHtml(state.client.customerNote || "-")}</strong></div>
        </div>
      </section>

      <section class="invoice-section">
        <div class="invoice-section-heading">
          <span>Chi tiết dịch vụ</span>
          <strong>${lineCount} dòng</strong>
        </div>
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Nội dung dịch vụ</th>
              <th>SL</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </section>

      <section class="invoice-section invoice-checkout">
        <div class="checkout-total">
          <div class="checkout-row"><span>Tạm tính</span><strong>${formatMoney(totals.subtotal)}</strong></div>
          <div class="checkout-row"><span>Phụ phí / điều chỉnh</span><strong>${formatMoney(totals.total - totals.subtotal)}</strong></div>
          <div class="checkout-grand"><span>Tổng thanh toán</span><strong>${formatMoney(totals.total)}</strong></div>
        </div>
        <div class="checkout-payment">
          <div class="payment-detail">
            <h3>Thông tin chuyển khoản</h3>
            <p><span>Chủ tài khoản</span><strong>${escapeHtml(state.business.bankAccountName)}</strong></p>
            <p><span>Số tài khoản</span><strong>${escapeHtml(state.business.bankAccount)}</strong></p>
            <p><span>Mã QR</span><strong>${escapeHtml(state.business.merchantCode)}</strong></p>
            <p><span>Nội dung</span><strong>${escapeHtml(note)}</strong></p>
          </div>
          <div class="qr-card">
            ${qrSrc ? `<img src="${escapeAttr(qrSrc)}" alt="QR chuyển tiền" onerror="this.onerror=null;this.src='${qrFallbackSrc}'" />` : `<div class="qr-fallback">QR chuyển tiền</div>`}
          </div>
        </div>
      </section>
      ${splitHtml}
      <footer class="invoice-footer">
        <span>Cảm ơn quý khách đã tin tưởng ${escapeHtml(state.business.brandName)}.</span>
        <strong>Hẹn gặp lại quý khách!</strong>
      </footer>
    </article>
  `;
}

function buildInternalSplitHtml(totals) {
  const entries = Object.entries(totals.byPerson);
  const rows = entries
    .map(([name, amount]) => `<p><span>${escapeHtml(name)}</span><strong>${formatMoney(amount)}</strong></p>`)
    .join("");
  return `
    <section class="invoice-section internal-split">
      <h3>Bảng chia nội bộ</h3>
      <div class="internal-box">
        ${rows || "<p>Chưa gán tiền cho ai</p>"}
        <p class="internal-keep"><span>Shop giữ lại</span><strong>${formatMoney(totals.shopKeep)}</strong></p>
      </div>
    </section>
  `;
}

function getQrSrc(amount) {
  if (state.business.qrDataUrl) return state.business.qrDataUrl;
  if (state.business.qrUrl) return state.business.qrUrl;
  if (typeof navigator !== "undefined" && navigator.onLine === false) return QR_FALLBACK_SRC;
  const bin = String(state.business.bankBin || "").trim();
  const account = String(state.business.bankAccount || "").replace(/\s/g, "");
  if (!bin || !account) return "";
  const params = new URLSearchParams({
    amount: String(Math.max(0, Math.round(amount))),
    addInfo: getTransferNote(),
    accountName: state.business.bankAccountName || "",
  });
  return `https://img.vietqr.io/image/${encodeURIComponent(bin)}-${encodeURIComponent(account)}-compact2.png?${params.toString()}`;
}

function getTransferNote() {
  const name = state.client.customerName ? ` ${state.client.customerName}` : "";
  return `${state.invoiceNo}${name}`.trim();
}

function printBill() {
  renderCalculations();
  saveCustomerToHistory();
  window.print();
}

function savePdf() {
  printBill();
}

function downloadBill() {
  const totals = getTotals();
  const css = standaloneCss();
  const html = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(state.invoiceNo)} - ${escapeHtml(state.client.customerName || "Hóa đơn")}</title>
  <style>${css}</style>
</head>
<body>
  ${buildInvoiceHtml(totals)}
</body>
</html>`;
  downloadText(`${safeFilename(state.invoiceNo)}.html`, html, "text/html;charset=utf-8");
}

function downloadJson() {
  downloadText(`${safeFilename(state.invoiceNo)}-data.json`, JSON.stringify(state, null, 2), "application/json;charset=utf-8");
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  flashButton("save-state", "Đã lưu");
}

function queueSave() {
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, 350);
}

function resetState() {
  const ok = window.confirm("Reset về mẫu mặc định?");
  if (!ok) return;
  state = defaultState();
  localStorage.removeItem(STORAGE_KEY);
  renderAll();
}

function flashButton(id, label) {
  const button = document.getElementById(id);
  const old = button.querySelector("span:last-child")?.textContent || "";
  const labelNode = button.querySelector("span:last-child");
  if (labelNode) labelNode.textContent = label;
  window.setTimeout(() => {
    if (labelNode) labelNode.textContent = old;
  }, 1000);
}

function downloadText(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function lineTotal(line) {
  return Math.max(0, toNumber(line.qty)) * Math.max(0, toNumber(line.unitPrice));
}

function toNumber(value) {
  const parsed = Number(String(value ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function priceToNumber(value) {
  // Dấu chấm trong giá VN là phân cách nghìn, xóa trước khi parse
  const parsed = Number(String(value ?? "").replace(/\./g, "").replace(/[^\d-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatPriceInput(value) {
  const num = priceToNumber(String(value));
  if (!num) return "";
  return new Intl.NumberFormat("vi-VN").format(Math.round(num));
}

function numberValue(value) {
  return String(toNumber(value));
}

function clampPct(value) {
  return Math.min(100, Math.max(0, toNumber(value)));
}

function formatMoney(value) {
  return `${new Intl.NumberFormat("vi-VN").format(Math.round(toNumber(value)))} đ`;
}

function formatShortMoney(value) {
  const amount = toNumber(value);
  if (!amount) return "Nhập giá";
  if (amount >= 1000000) return `${amount / 1000000}tr`;
  return `${Math.round(amount / 1000)}k`;
}

function formatQty(value) {
  const number = toNumber(value);
  return Number.isInteger(number) ? String(number) : String(number).replace(".", ",");
}

function formatPercent(value) {
  return `${Math.round(toNumber(value) * 10) / 10}%`;
}

function formatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function toDateInput(date) {
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function makeInvoiceNo(date) {
  const pad = (number) => String(number).padStart(2, "0");
  const stamp = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  const time = `${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  return `TTM-${stamp}-${time}`;
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function safeFilename(value) {
  return String(value || "bill").replace(/[^a-z0-9-_]+/gi, "-").replace(/-+/g, "-");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function standaloneCss() {
  return `
body{margin:0;background:#f8f4f6;color:#211f22;font-family:Inter,Arial,sans-serif;padding:18px}
.invoice-paper{width:min(100%,760px);margin:0 auto;border:1px solid #decbd3;border-radius:8px;background:#fff;overflow:hidden;box-shadow:0 18px 44px rgba(42,31,37,.11)}
.invoice-header{display:grid;grid-template-columns:minmax(0,1fr);gap:16px;padding:26px;border-bottom:1px solid #ead8df;background:linear-gradient(135deg,#fff,#fff3f8)}
.invoice-brand-block{min-width:0}.invoice-kicker{margin:0 0 8px;color:#bd4e79;font-size:12px;font-weight:950;text-transform:uppercase}.invoice-brand{color:#201b1f;font-size:clamp(26px,4.2vw,36px);font-weight:950;line-height:1.04;overflow-wrap:anywhere}
.invoice-meta{display:grid;gap:4px;margin-top:10px;color:#4d5356;font-size:12px;font-weight:700;min-width:0}.invoice-meta span{overflow-wrap:anywhere}.invoice-title{display:grid;align-content:start;gap:7px;width:min(100%,430px);border:1px solid rgba(189,78,121,.2);border-radius:8px;background:#fff;padding:14px;text-align:left}
.invoice-title h2{margin:0;font-size:clamp(18px,3.4vw,24px);text-transform:uppercase;overflow-wrap:anywhere}.invoice-title span{font-size:12px;color:#6d646b;font-weight:900}
.invoice-section{padding:20px 26px;border-bottom:1px solid #e9dce2}.invoice-section:last-child{border-bottom:0}.invoice-section-heading{display:flex;align-items:baseline;justify-content:space-between;gap:14px;margin-bottom:14px}
.invoice-section-heading span{color:#bd4e79;font-size:12px;font-weight:950;text-transform:uppercase}.invoice-section-heading strong{color:#211f22;font-size:17px;overflow-wrap:anywhere;text-align:right}.invoice-section-heading.compact{margin-bottom:10px}
.customer-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.info-block{display:grid;gap:2px;min-width:0;border:1px solid #f0e0e6;border-radius:8px;background:#fffafb;padding:10px 12px}.info-block span{color:#707578;font-size:12px;font-weight:800}.info-block strong{min-height:20px;overflow-wrap:anywhere}.wide{grid-column:1/-1}
.invoice-table{width:100%;border-collapse:collapse;overflow:hidden;border:1px solid #ead8df;border-radius:8px}.invoice-table th,.invoice-table td{border-bottom:1px solid #e9dce2;padding:11px 10px;text-align:left}.invoice-table th{background:#fff0f5;color:#6e3c53;font-size:12px;text-transform:uppercase}.invoice-table tbody tr:nth-child(even){background:#fffafb}.invoice-table tbody tr:last-child td{border-bottom:0}.line-index{display:inline-grid;place-items:center;width:22px;height:22px;margin-right:8px;border-radius:999px;background:#ffe4ee;color:#9f3e68;font-size:11px;font-weight:950}
.invoice-table td:nth-child(2),.invoice-table td:nth-child(3),.invoice-table td:nth-child(4),.invoice-table th:nth-child(2),.invoice-table th:nth-child(3),.invoice-table th:nth-child(4){text-align:right}
.invoice-checkout{display:grid;gap:14px}.checkout-total{display:grid;gap:8px;border:1px solid #ead8df;border-radius:8px;background:#fffafb;padding:14px}.checkout-row,.checkout-grand{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:16px;align-items:center}.checkout-row{color:#6d646b;font-weight:850}.checkout-row strong{color:#211f22;white-space:nowrap}.checkout-grand{margin-top:4px;border-radius:8px;background:#211f22;color:#fff;padding:16px 18px;font-size:18px;font-weight:950}.checkout-grand strong{font-size:28px;white-space:nowrap}
.checkout-payment{display:grid;grid-template-columns:minmax(0,1fr) 172px;gap:14px;align-items:start;border:1px solid #ead8df;border-radius:8px;background:#fffafb;padding:14px}.payment-detail{display:grid;gap:8px;min-width:0}.payment-detail h3{margin:0 0 2px;color:#bd4e79;font-size:13px;font-weight:950;text-transform:uppercase}.payment-detail p{display:grid;grid-template-columns:92px minmax(0,1fr);gap:10px;color:#4f5558;font-size:12px;font-weight:800}.payment-detail span{color:#85747d}.payment-detail strong{color:#343034;overflow-wrap:anywhere}.qr-card{display:grid;justify-items:center;border:0;padding:0;background:transparent}.qr-card img,.qr-fallback{width:160px;height:160px;object-fit:contain;border-radius:6px;background:#fff}.qr-fallback{display:grid;place-items:center;border:2px dashed #d8bec8;color:#6d646b;font-weight:900;text-align:center;padding:12px}
.invoice-footer{display:grid;gap:4px;padding:16px 26px;background:#211f22;color:#fff;font-size:13px}.invoice-footer strong{white-space:nowrap}.internal-split{background:#fff9fb}.internal-split h3{margin:0 0 10px}.internal-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.internal-box{border:1px solid #ead8df;border-radius:8px;padding:10px}.internal-box h4{margin:0 0 8px}.internal-box p{display:flex;justify-content:space-between;gap:10px;margin:4px 0;color:#52575a;font-size:13px}.empty-line{padding:24px;color:#6d646b;text-align:center;font-weight:800}
@media(max-width:760px){body{padding:10px}.invoice-header,.checkout-payment,.customer-grid,.internal-grid{grid-template-columns:1fr}.invoice-title{text-align:left}.payment-detail p{grid-template-columns:1fr;gap:2px}.invoice-section,.invoice-header{padding-left:16px;padding-right:16px}.invoice-footer{display:grid}}
@media(max-width:480px){.checkout-row,.checkout-grand{grid-template-columns:1fr;gap:4px}.checkout-grand strong{font-size:24px}}
@media print{@page{size:A4;margin:10mm}body{padding:0;background:#fff}.invoice-paper{width:100%;border:0;border-radius:0;box-shadow:none}.invoice-header{-webkit-print-color-adjust:exact;print-color-adjust:exact}.checkout-payment{grid-template-columns:minmax(0,1fr) 236px}.payment-detail p{grid-template-columns:110px minmax(0,1fr)}.qr-card img,.qr-fallback{width:224px;height:224px}}
`;
}

init();

