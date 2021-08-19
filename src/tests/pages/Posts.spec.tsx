import { render, screen } from "@testing-library/react";
import { mocked } from 'ts-jest/utils';

import { stripe } from '../../services/stripe'
import Posts, { getStaticProps } from '../../pages/posts'
import { getPrismiscClient } from '../../services/prismic';


const posts = [
  {
    slug: 'my-new-post',
    title: 'My new post',
    excerpt: 'Post excerpt',
    updatedAt: 'August 16',
  }
]

jest.mock('../../services/prismic');

describe('Home page', () => {

  it('renders correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText('My new post')).toBeInTheDocument();
  })

  it('loads initial data', async () => {

    const getPrismicClientMocked = mocked(getPrismiscClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                { type: 'heading', text: 'My new post' }
              ],
              content: [
                { type: 'paragraph', text: 'Post excerpt' }
              ],
            },
            last_publication_date: '08-01-2021',
          }
        ]
      })
    } as any)


    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My new post',
            excerpt: 'Post excerpt',
            updatedAt: '01 de agosto de 2021',
          }]
        }
      })
    )
  })

})