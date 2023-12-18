import { getAllTags } from '@/app/actions/tag.actions';

export const Sidebar = async () => {
  const tags = await getAllTags();

  return (
    <aside className='bg-dark_gray p-5 tablet-landscape-up:w-60 hidden tablet-landscape-up:block'>
      {tags &&
        tags.map((tag) => (
          <div className='mb-3' key={tag.id}>
            <button className='bg-dark_gray text-white rounded-md p-2 py-1 text-sm'>
              {tag.name}
            </button>
          </div>
        ))}
    </aside>
  );
};
