import { useMemo, useState } from "react";

import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdEmojiEvents,
} from "react-icons/md";

import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import { adminSidebar } from "@/features/dashboard/components/configs/admin.config";
import DeleteConfirmModal from "@/shared/components/DeleteConfirmModal";
import FormField from "@/shared/components/FormField";
import ModalShell from "@/shared/components/ModalShell";
import SuccessModal from "@/shared/components/SuccessModal";
import { useFeedbackModal } from "@/shared/hooks/useFeedbackModal";

import { useGamification } from "@/entities/gamification/hooks/useGamification";

const levelTones = [
  "border-[#97c459] bg-[#eaf3de] text-[#3b6d11]",
  "border-[#5dcaa5] bg-[#e1f5ee] text-[#0f6e56]",
  "border-[#85b7eb] bg-[#e6f1fb] text-[#185fa5]",
  "border-[#afa9ec] bg-[#eeedfe] text-[#534ab7]",
  "border-[#ef9f27] bg-[#faeeda] text-[#854f0b]",
  "border-[#f0997b] bg-[#faece7] text-[#993c1d]",
];

const emptyForm = {
  name: "",
  min_points: "",
};

const formatNumber = (value) => Number(value).toLocaleString("id-ID");

const getFirstError = (errors, field) => {
  const value = errors?.[field];

  return Array.isArray(value) ? value[0] : value;
};

const AdminLevelsPage = () => {
  const {
    levels,
    isFetching,
    isMutating,
    error,
    fieldErrors,
    createLevel,
    updateLevel,
    deleteLevel,
  } = useGamification();

  const [modalOpen, setModalOpen] = useState(false);

  const [editingLevel, setEditingLevel] = useState(null);

  const [deletingLevel, setDeletingLevel] = useState(null);

  const { feedback, showFeedback, closeFeedback } = useFeedbackModal();

  const [form, setForm] = useState(emptyForm);

  const sortedLevels = useMemo(
    () => [...levels].sort((a, b) => a.min_points - b.min_points),
    [levels],
  );

  const openCreateModal = () => {
    setEditingLevel(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (level) => {
    setEditingLevel(level);

    setForm({
      name: level.name,
      min_points: String(level.min_points),
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingLevel(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const minPoints = Number(form.min_points);

    if (!form.name.trim()) {
      alert("Nama level wajib diisi");
      return;
    }

    if (!Number.isFinite(minPoints) || minPoints < 0) {
      alert("Minimum poin harus berupa angka positif");
      return;
    }

    try {
      const payload = {
        name: form.name.trim(),
        min_points: minPoints,
      };

      if (editingLevel) {
        await updateLevel(editingLevel.id, payload);
        showFeedback("Level Updated", "Level updated successfully");
      } else {
        await createLevel(payload);
        showFeedback("Level Created", "Level created successfully");
      }

      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLevel(id);
      setDeletingLevel(null);
      showFeedback("Level Deleted", "Level deleted successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout
      sidebar={adminSidebar}
      title="Level Gamifikasi"
      subtitle="Kelola nama level, batas minimum poin, dan progres nasabah."
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-[#ded6ad] bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#639922]">
              Total level aktif
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#0d4f2c]">
              {sortedLevels.length} Level
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-gray-500">
              Level akan diurutkan otomatis berdasarkan minimum poin terendah.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            disabled={isMutating}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#14532d] px-6 py-3 font-semibold text-white transition hover:bg-[#0f3d22]"
          >
            <MdAdd size={18} />
            Tambah Level
          </button>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {isFetching && (
          <div className="rounded-2xl border border-[#ded6ad] bg-white p-6 text-sm font-medium text-gray-500 shadow-sm">
            Loading levels...
          </div>
        )}

        {!isFetching && !sortedLevels.length && (
          <div className="rounded-2xl border border-dashed border-[#ded6ad] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf3de] text-[#3b6d11]">
              <MdEmojiEvents size={28} />
            </div>

            <h2 className="text-lg font-bold text-[#0d4f2c]">
              Belum ada level gamifikasi
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Tambahkan level pertama untuk mulai mengatur progres poin nasabah.
            </p>
          </div>
        )}

        {!isFetching && sortedLevels.length > 0 && (
          <div className="grid gap-4">
            {sortedLevels.map((level, index) => {
              const nextLevel = sortedLevels[index + 1];

              const tone = levelTones[index % levelTones.length];

              return (
                <article
                  key={level.id}
                  className={`grid gap-4 rounded-2xl border p-5 shadow-sm ${tone} lg:grid-cols-[auto_1fr_auto] lg:items-center`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70">
                    <MdEmojiEvents size={28} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-bold">{level.name}</h2>

                      <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold">
                        Rank {index + 1}
                      </span>
                    </div>

                    <p className="mt-2 text-sm opacity-80">
                      Minimum {formatNumber(level.min_points)} poin
                      {nextLevel
                        ? ` sampai ${formatNumber(
                            nextLevel.min_points - 1,
                          )} poin`
                        : " dan seterusnya"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 lg:justify-end">
                    <button
                      type="button"
                      onClick={() => openEditModal(level)}
                      disabled={isMutating}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/70 px-4 py-2 text-sm font-semibold transition hover:bg-white"
                    >
                      <MdEdit size={17} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingLevel(level)}
                      disabled={isMutating}
                      className="inline-flex items-center gap-2 rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                    >
                      <MdDelete size={17} />
                      Hapus
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {modalOpen && (
        <ModalShell
          open={modalOpen}
          title={editingLevel ? "Edit Level" : "Tambah Level"}
          description="Tentukan nama level dan batas minimum poin."
          onClose={closeModal}
          showCloseButton
          panelClassName="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              label="Nama Level"
              name="name"
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="Eco Ranger"
              error={getFirstError(fieldErrors, "name")}
            />

            <FormField
              label="Minimum Poin"
              name="min_points"
              type="number"
              value={form.min_points}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  min_points: event.target.value,
                }))
              }
              placeholder="700"
              error={getFirstError(fieldErrors, "min_points")}
            />

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-2xl bg-gray-100 px-6 py-3 text-gray-700"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={isMutating}
                className="rounded-2xl bg-[#14532d] px-6 py-3 font-semibold text-white disabled:opacity-60"
              >
                {isMutating ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </ModalShell>
      )}

      <DeleteConfirmModal
        open={!!deletingLevel}
        item={deletingLevel}
        title="Delete Level"
        itemLabel="level"
        itemDescription={
          deletingLevel
            ? `Minimum ${formatNumber(deletingLevel.min_points)} poin`
            : ""
        }
        confirmText="Delete Level"
        loading={isMutating}
        onClose={() => setDeletingLevel(null)}
        onConfirm={handleDelete}
      />

      <SuccessModal
        open={feedback.open}
        title={feedback.title}
        message={feedback.message}
        onClose={closeFeedback}
      />
    </DashboardLayout>
  );
};

export default AdminLevelsPage;
