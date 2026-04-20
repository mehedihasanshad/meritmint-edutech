import { redirect } from 'next/navigation';
import { getSession, isAdmin } from '@/lib/auth';
import { ExamEditorForm } from '../ExamEditorForm';

export default async function NewExamPage() {
  const session = await getSession();
  if (!session) redirect('/login?next=/admin/exams/new');
  if (!isAdmin(session)) redirect('/');

  return (
    <section className="section">
      <span className="eyebrow">Admin · New</span>
      <h1 className="display-headline mt-4">
        Create <span className="italic-serif">a new exam.</span>
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Set the basics now; add questions right after you save.
      </p>
      <ExamEditorForm mode="create" />
    </section>
  );
}
